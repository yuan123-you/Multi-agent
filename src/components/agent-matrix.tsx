"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agents } from "@/data/plan";

const layerColor: Record<string, string> = {
  调度层: "bg-primary/10 text-primary",
  文: "bg-sky-100 text-sky-900",
  商: "bg-amber-100 text-amber-900",
  旅: "bg-emerald-100 text-emerald-900",
  保障层: "bg-stone-200 text-stone-800",
  进化层: "bg-violet-100 text-violet-900",
};

export function AgentMatrix() {
  const [activeId, setActiveId] = useState(agents[0].id);
  const active = agents.find((a) => a.id === activeId) ?? agents[0];
  const related = useMemo(() => {
    const ids = new Set([...active.calls, ...agents.filter((a) => a.calls.includes(active.id)).map((a) => a.id)]);
    ids.delete(active.id);
    return agents.filter((a) => ids.has(a.id));
  }, [active]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {agents.map((agent) => {
          const isActive = agent.id === activeId;
          const isRelated = related.some((r) => r.id === agent.id);
          return (
            <button
              key={agent.id}
              type="button"
              onClick={() => setActiveId(agent.id)}
              className={`rounded-xl border p-3 text-left transition ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : isRelated
                    ? "border-primary/40 bg-card"
                    : "border-border bg-card/70 hover:border-primary/30"
              }`}
            >
              <div className="text-[11px] opacity-70">{agent.no}</div>
              <div className="font-heading text-base">{agent.name}</div>
              <div className={`mt-1 text-xs ${isActive ? "opacity-90" : "text-muted-foreground"}`}>
                {agent.role}
              </div>
            </button>
          );
        })}
      </div>

      <Card className="bg-card">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="font-heading text-2xl">
              {active.no} {active.name}
            </CardTitle>
            <Badge className={layerColor[active.layer]} variant="secondary">
              {active.layer}
            </Badge>
          </div>
          <CardDescription>{active.role} · {active.persona}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-7">
          <p className="rounded-lg bg-muted px-3 py-2 text-foreground/90">
            「{active.greeting}」
          </p>
          <Block title="听什么" items={active.inputs} />
          <Block title="交出什么" items={active.outputs} />
          <Block title="知识库" items={active.knowledge} />
          <div>
            <div className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">
              协同关系
            </div>
            <p>
              会呼叫：{related.filter((r) => active.calls.includes(r.id)).map((r) => r.name).join("、") || "—"}
            </p>
            <p>
              会被谁叫：{agents.filter((a) => a.calls.includes(active.id) && a.id !== active.id).map((a) => a.name).join("、") || "完成后回传总调度"}
            </p>
          </div>
          <p className="border-l-2 border-primary pl-3 text-foreground">
            必做：{active.mustHave}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item} variant="outline" className="font-normal">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
