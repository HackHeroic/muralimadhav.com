import React from "react";

interface AchievementRowProps {
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
  href?: string;
}

export const AchievementRow = ({
  title,
  issuer,
  date,
  description,
  href,
}: AchievementRowProps) => {
  const meta = [issuer, description].filter(Boolean).join(" · ");

  return (
    <div className="flex flex-col gap-y-0.5">
      <div className="flex items-baseline justify-between gap-x-3">
        <h3 className="text-sm font-semibold leading-snug">
          {href ? (
            <a
              href={href}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {date && (
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {date}
          </span>
        )}
      </div>
      {meta && (
        <p className="text-xs leading-snug text-muted-foreground">{meta}</p>
      )}
    </div>
  );
};
