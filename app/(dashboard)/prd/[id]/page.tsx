"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { PrdSectionCards } from "@/components/editor/prd-section-cards";
import { sectionsToMarkdown } from "@/lib/ai/parse-prd";
import { useAppStore } from "@/lib/store/use-app-store";
import type { PrdDocument } from "@/lib/types";

export default function PrdDetailPage() {
  const params = useParams();
  const router = useRouter();
  const getPrd = useAppStore((s) => s.getPrd);
  const updatePrd = useAppStore((s) => s.updatePrd);
  const savePrdVersion = useAppStore((s) => s.savePrdVersion);
  const [prd, setPrd] = useState<PrdDocument | undefined>();

  useEffect(() => {
    const doc = getPrd(params.id as string);
    setPrd(doc);
  }, [params.id, getPrd]);

  if (!prd) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">PRD not found</p>
        <Button className="mt-4" onClick={() => router.push("/prd")}>
          Create new PRD
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    savePrdVersion(prd.id, prd.sections);
    updatePrd(prd.id, { sections: prd.sections });
    toast.success("PRD saved with version history");
  };

  const exportMarkdown = () => {
    const md = sectionsToMarkdown(prd.sections);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prd-${prd.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title={prd.title}
        description={`${prd.priority} priority · Updated ${new Date(prd.updatedAt).toLocaleDateString()}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportMarkdown}>
              Export MD
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        }
      />

      {prd.versions.length > 0 && (
        <div className="text-muted-foreground text-sm">
          {prd.versions.length} version snapshot{prd.versions.length > 1 ? "s" : ""} saved
        </div>
      )}

      <PrdSectionCards
        sections={prd.sections}
        onChange={(sections) => setPrd({ ...prd, sections })}
      />
    </div>
  );
}
