// app/data/supervision.ts
import { Users, UserRound, Building2, Brain, Crown, Globe, LucideIcon } from "lucide-react";

export interface SupervisionType {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const SUPERVISION_TYPES: SupervisionType[] = [
  {
    icon: UserRound,
    title: "Individual Clinical Supervision",
    desc: "For practitioners who need dedicated space to process complexity. One-on-one sessions focused on case work, ethical dilemmas, and the emotional weight of practice.",
  },
  {
    icon: Users,
    title: "Group Clinical Supervision",
    desc: "Because sometimes the most powerful learning happens in community. Small group sessions (4-6 practitioners) create a reflective space where shared challenges become collective wisdom.",
  },
  {
    icon: Building2,
    title: "Organisational Supervision",
    desc: "For leadership who understand that staff sustainability is a strategic investment. Tailored 12-month programs designed for agencies managing 5–8+ therapeutic specialists.",
  },
  {
    icon: Brain,
    title: "Trauma-Informed Supervision",
    desc: "For practitioners and teams specialising in complex trauma. Grounded in neuroscience and attachment theory, this supervision model understands the full human cost of the work.",
  },
  {
    icon: Crown,
    title: "Leadership & Executive Consultation",
    desc: "For leaders making high-stakes decisions in complex systems. Clinical supervision isn't just for frontline staff — leaders benefit from space to reflect, recharge, and lead ethically.",
  },
  {
    icon: Globe,
    title: "Culturally Informed Supervision",
    desc: "For practitioners and organisations committed to working authentically with Aboriginal and Torres Strait Islander communities.",
  },
];