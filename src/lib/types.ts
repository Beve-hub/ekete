import type { LucideIcon } from "lucide-react";


export type ArticleSection = {
  heading: string;
  content: string;
  image?: string;
};

export type Article = {
author: string;
date: string; 
tags: string[];
  id: string;
  title: string;
  sections: ArticleSection[];
  coverImage: string;
};

export type SocialLink = {
platform: LucideIcon;
href: string;
label?: string;
};

export type ProjectLinks = {
  title: string;
  repo: string;
  summary: string;
};

export type Subsection = {
  id: number;
  subtitle: string;
  body: string;
};

export type FileWithPreview = { 
  file: File; 
  preview: string
 };

 export type WriteUpForm = {
   title: string;
   category: string;
   content: string;
   tags: string;
   email: string;
 };


 