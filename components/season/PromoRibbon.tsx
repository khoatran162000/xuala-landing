import type { Season } from "@/content/types";

export function PromoRibbon({ season }: { season: Season }) {
  if (!season.promo) return null;
  return (
    <p className={`promo promo--${season.id}`}>
      <span className="wrap">{season.promo.text}</span>
    </p>
  );
}
