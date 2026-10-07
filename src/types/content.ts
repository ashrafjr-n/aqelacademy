import type { StaticImageData } from "next/image";

export interface NavLink {
  href: string;
  label: string;
}

export interface ContentImage {
  src: StaticImageData;
  alt: string;
}

/** Long-form text block. Inline `**text**` renders as bold. */
export type RichBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type CourseLevel = "all" | "beginner" | "intermediate" | "advanced";

export interface Instructor {
  name: string;
  title: string;
  image: ContentImage;
}

export interface Course {
  slug: string;
  title: string;
  excerpt: string;
  image: ContentImage;
  priceUsd: number;
  durationWeeks: number;
  trainingHours: number;
  level: CourseLevel;
  instructor: Instructor;
  body: RichBlock[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  image: ContentImage;
  body: RichBlock[];
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  link?: NavLink;
}

/** A dated legal page (privacy, refunds). */
export interface PolicyDocument {
  title: string;
  lastUpdated: string;
  /** ISO date, shared by both languages. */
  updatedAt: string;
  body: RichBlock[];
}

export interface TitledText {
  title: string;
  text: string;
}
