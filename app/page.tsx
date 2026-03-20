"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

/* ───────────────────────── data ───────────────────────── */

const features = [
  {
    icon: "🔑",
    title: "Identity",
    desc: "One call → Ethereum wallet + API key",
    sub: "Your agent exists on-chain from day 1.",
  },
  {
    icon: "💳",
    title: "Payments",
    desc: "USDC via x402 protocol.",
    sub: "Agents pay for APIs. Agents get paid.",
  },
  {
    icon: "🤝",
    title: "Trust",
    desc: "On-chain reputation score.",
    sub: "Fore-Trust: the credit score for AI agents.",
  },
];

const codeTabs = [
  {
    label: "Provision",
    code: `import { ForeNet } from "@fore-net/sdk";

const client = new ForeNet({ baseUrl: "https://api.fore-net.io" });

const agent = await client.agents.provision({
  name: "my-bot",
  capabilities: ["trading", "analysis"],
});
// → { agentId, address: "0x...", apiKey: "fnet_..." }`,
  },
  {
    label: "Name",
    code: `await client.names.register(agent.apiKey, {
  name: "my-bot",
  namespace: "agents",
});
// → my-bot.agents.fore-net`,
  },
  {
    label: "Trust",
    code: `const trust = await client.trust.get(agent.agentId);
// → { score: 0.85 }`,
  },
];

const layers = [
  { n: 7, name: "Compliance / Governance", status: "Coming Soon" },
  { n: 6, name: "Discovery / A2A Economy", status: "Coming Soon" },
  { n: 5, name: "Contracts / Escrow", status: "Beta" },
  { n: 4, name: "Trust / Reputation", status: "Live" },
  { n: 3, name: "Presence / eSIM", status: "Live" },
  { n: 2, name: "Finance / Payments", status: "Live" },
  { n: 1, name: "Identity", status: "Live" },
];

const statusColor: Record<string, string> = {
  Live: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Beta: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Coming Soon": "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

/* ───────────────────── components ─────────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 font-mono text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800"
    >
      <span>$ npm install @fore-net/sdk</span>
      <span className="text-zinc-500">{copied ? "✓" : "⎘"}</span>
    </button>
  );
}

/* ────────────────────── page ──────────────────────────── */

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            The Internet for{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              AI Agents
            </span>
            .
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400 sm:text-xl">
            Give your agent an address, a wallet, and a name.
            <br />
            In one API call.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CopyButton text="npm install @fore-net/sdk" />
            <a
              href="https://github.com/zaq2989/fore-net-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ─── What it does ─── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          What it does
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700"
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-zinc-400">{f.desc}</p>
              <p className="mt-1 text-sm text-zinc-500">{f.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Code Demo ─── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Simple by design
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <div className="flex border-b border-zinc-800 bg-zinc-900/80">
            {codeTabs.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-3 text-sm font-medium transition ${
                  activeTab === i
                    ? "border-b-2 border-indigo-400 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="bg-[#1e1e1e]">
            <SyntaxHighlighter
              language="javascript"
              style={atomOneDark}
              customStyle={{
                background: "transparent",
                padding: "1.5rem",
                margin: 0,
                fontSize: "0.875rem",
                lineHeight: "1.7",
              }}
            >
              {codeTabs[activeTab].code}
            </SyntaxHighlighter>
          </div>
        </div>
      </section>

      {/* ─── Architecture ─── */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Architecture
        </h2>
        <div className="space-y-2">
          {layers.map((l) => (
            <div
              key={l.n}
              className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-3 transition hover:border-zinc-700"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-zinc-500">
                  Layer {l.n}
                </span>
                <span className="text-sm font-medium">{l.name}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor[l.status]}`}
              >
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Get Started ─── */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Get started
        </h2>
        <CopyButton text="npm install @fore-net/sdk" />
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-800 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
          <span>&copy; 2026 Fore- Ltd.</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/zaq2989/fore-net-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://npmjs.com/package/@fore-net/sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              npm
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
