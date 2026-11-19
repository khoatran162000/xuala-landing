import { site, story } from "@/content/site";
import { Seal } from "../Seal";

export function Story() {
  return (
    <section className="section story" id="cau-chuyen" aria-labelledby="story-title">
      <div className="wrap story-grid">
        <div className="scroll">
          <h2 id="story-title">{story.title}</h2>
          <p className="poem callig">
            {story.poem.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </p>
          <Seal className="scroll-seal">{site.name}</Seal>
        </div>
        <div className="story-text">
          {story.text.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <dl className="origins">
            {story.origins.map((o) => (
              <div key={o.place}>
                <dt>{o.place}</dt>
                <dd>{o.what}</dd>
              </div>
            ))}
          </dl>
          <p className="community">{story.community}</p>
        </div>
      </div>
    </section>
  );
}
