import { notFound } from "next/navigation";

/** Unknown URLs land here (the middleware sends every page path under [lang]), so [lang]/not-found.tsx renders inside the site layout. */
export default function UnknownPage() {
  notFound();
}
