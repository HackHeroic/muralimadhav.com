import { DATA } from "@/data/resume";
// import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Card components are no longer needed
// import Image from "next/image"; // Image component is no longer needed
import { LinkIcon, TrendingUp } from "lucide-react";
import React from "react";

// Separate component for author list with expand/collapse functionality
function AuthorList({ authors }: { authors: string[] }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const fullAuthorList = authors
    .map(
      (author, index) =>
        `<span key="${index}">${author}${index < authors.length - 1 ? ", " : ""}</span>`,
    )
    .join("");

  const truncateAuthors = (authors: string, maxLength: number) => {
    if (authors.length <= maxLength) return authors;
    return authors.slice(0, maxLength) + "...";
  };

  return (
    <>
      <span
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? fullAuthorList
            : truncateAuthors(fullAuthorList, 310),
        }}
      />
      {fullAuthorList.length > 310 && (
        <button onClick={() => setIsExpanded(!isExpanded)} className="">
          {isExpanded ? "... (collapse)" : "... (see all)"}
        </button>
      )}
    </>
  );
}

export function Publications() {
  return (
    <section id="publications" className="py-12">
      {" "}
      {/* Added py-12 for consistency with other sections */}
      <div className="flex justify-center mb-8">
        {" "}
        {/* Centered the heading block and added margin */}
        <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
          Research Publications
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 md:gap-8">
        {" "}
        {/* Increased gap slightly */}
        {DATA.publications.map((publication, id) => (
          <div
            key={id}
            className="flex flex-col w-full max-w-3xl mx-auto px-4 md:px-0"
          >
            {" "}
            {/* Centered content and added max-width */}
            <div>
              <h3 className="text-lg font-semibold leading-tight">
                <a
                  className="hover:underline"
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {publication.title}
                </a>
              </h3>
              {/* Image rendering removed */}
            </div>
            <div className="mt-2 text-sm">
              {" "}
              {/* Adjusted font size for readability */}
              {/* <div className="text-gray-700 dark:text-gray-300">
                <AuthorList authors={publication.authors} />
              </div> */}
              {publication.contributionNote && (
                <div className="mt-1 text-xs font-semibold">
                  {publication.contributionNote}
                </div>
              )}
              <div className="mt-1 text-[#0894ff]">
                {publication.venue}
              </div>
              {publication.links && publication.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
                  {" "}
                  {/* Increased gap slightly */}
                  {publication.links.map((link, linkId) => (
                    <a
                      key={linkId}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-x-1 text-xs md:text-sm text-muted-foreground hover:underline"
                    >
                      {link.icon ? (
                        link.icon
                      ) : (
                        <LinkIcon className="size-3 md:size-4" />
                      )}{" "}
                      {/* Adjusted icon size */}
                      {link.title}
                    </a>
                  ))}
                  <a
                      style={{ visibility: !publication.citationLink ? "hidden" : "visible" }}
                      href={publication.citationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-x-1 text-xs md:text-sm text-muted-foreground hover:underline"
                    >
                      <TrendingUp className="size-3 md:size-4" />
                      {/* Adjusted icon size */}
                      {publication.citation}
                    </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
