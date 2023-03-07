import { Navigation } from "../types/navigation";

export const NAVIGATIONS: Navigation[] = [
  {
    text: "Blog",
    url: "/blog",
  },
  {
    text: "Socials",
    url: "/socials",
  },
  {
    text: "Past Socials",
    url: "/past-socials",
  },
  {
    text: "Clubs",
    url: "/clubs",
    children: [],
  },
  {
    text: "Contact",
    url: "/contact",
  },
];
