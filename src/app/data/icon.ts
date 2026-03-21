// src/app/data/icon.ts
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export const SOCIAL_ICONS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Facebook, label: "Facebook" },
];

// Add default export for the API route
export default function handler() {
  return Response.json(SOCIAL_ICONS);
}
