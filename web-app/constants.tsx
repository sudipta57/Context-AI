import React from "react";
import { Intent } from "./types";
import {
  GraduationCap,
  Search,
  ShoppingBag,
  Briefcase,
  PlayCircle,
} from "lucide-react";

export const DEFAULT_INTENT_THEME = {
  color: "bg-gray-100 text-gray-800",
  icon: <Search size={14} />,
  label: "Other",
};

export const INTENT_THEMES: Record<
  string,
  { color: string; icon: React.ReactNode; label: string }
> = {
  [Intent.LEARNING]: {
    color: "bg-blue-100 text-blue-800",
    icon: <GraduationCap size={14} />,
    label: "Learning",
  },
  [Intent.RESEARCH]: {
    color: "bg-slate-200 text-slate-800",
    icon: <Search size={14} />,
    label: "Research",
  },
  [Intent.SHOPPING]: {
    color: "bg-emerald-100 text-emerald-800",
    icon: <ShoppingBag size={14} />,
    label: "Shopping",
  },
  [Intent.WORK]: {
    color: "bg-indigo-100 text-indigo-800",
    icon: <Briefcase size={14} />,
    label: "Work",
  },
  [Intent.ENTERTAINMENT]: {
    color: "bg-cyan-100 text-cyan-800",
    icon: <PlayCircle size={14} />,
    label: "Entertainment",
  },
};

export const API_BASE_URL = "https://context-ai-fwfu.onrender.com/api";
