import type { Article } from "./types";

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


export const ensureSection = (article: Article) => {
  if (!article.sections || article.sections.length === 0) {
    article.sections = [
      {
        heading: "Default Heading",
        content: "Default content for the section.",
        image: "default.jpg",
      },
    ];
  }
};
