"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { landingFeatures, pricingTiers } from "@/lib/mock/seed";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-border/50 sticky top-0 z-50 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
              <Sparkles className="size-4" />
            </div>
            <span className="font-semibold">ProdPilot AI</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <Badge variant="secondary" className="mb-4">
            AI-native product management
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Ship better products with{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              AI-powered
            </span>{" "}
            workflows
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Generate PRDs, prioritize features, analyze feedback, and monitor KPIs — all in one
            modern workspace built for product teams.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Free <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">View Demo</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <section id="features" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Everything PMs need</h2>
            <p className="text-muted-foreground mt-2">
              Six AI-powered workflows in one enterprise-grade dashboard
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {landingFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Simple pricing</h2>
            <p className="text-muted-foreground mt-2">Start free, scale as you grow</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={tier.highlighted ? "border-violet-500/50 ring-1 ring-violet-500/20" : ""}
              >
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {tier.price}
                    {tier.price !== "Custom" && (
                      <span className="text-muted-foreground text-sm font-normal">/mo</span>
                    )}
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="text-violet-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" variant={tier.highlighted ? "default" : "outline"} asChild>
                    <Link href="/signup">Get started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="glass-card mx-auto max-w-4xl p-12 text-center">
          <h2 className="text-3xl font-bold">Ready to transform your product workflow?</h2>
          <p className="text-muted-foreground mt-3">
            Join product teams using AI to ship faster and smarter.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/signup">Start Free Today</Link>
          </Button>
        </div>
      </section>

      <footer className="border-border border-t px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ProdPilot AI. Portfolio demo project.</p>
      </footer>
    </div>
  );
}
