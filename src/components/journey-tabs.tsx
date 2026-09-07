import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { journeys } from "@/data/plan";

export function JourneyTabs() {
  return (
    <div className="journey-shell">
      <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="演示剧本">
        {journeys.map((j, index) => (
          <label
            key={j.id}
            htmlFor={`journey-${j.id}`}
            className="cursor-pointer rounded-full border border-border bg-card px-4 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
          >
            <input
              type="radio"
              name="journey-tab"
              id={`journey-${j.id}`}
              defaultChecked={index === 0}
              className="sr-only"
            />
            {j.title.split("·")[0].trim()}
          </label>
        ))}
      </div>
      {journeys.map((j) => (
        <Card key={j.id} id={`panel-${j.id}`} className="journey-panel">
          <CardHeader>
            <CardTitle>{j.title}</CardTitle>
            <CardDescription>
              {j.duration} · {j.goal}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {j.beats.map((beat, i) => (
                <li key={beat} className="flex gap-3 text-sm leading-7">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  <span>{beat}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
