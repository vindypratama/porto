import {
  Code2,
  Server,
  Monitor,
  Database,
  Radio,
  Cpu,
  Terminal,
  Key,
  Shield,
  Layers,
  Boxes,
  Container,
  Settings,
  Layout,
  Zap,
  Activity,
  Clock,
  Gauge,
  Globe,
  Wifi,
  Lock,
  Mail,
  ExternalLink,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "code-2":      Code2,
  "server":      Server,
  "monitor":     Monitor,
  "database":    Database,
  "radio":       Radio,
  "cpu":         Cpu,
  "terminal":    Terminal,
  "key":         Key,
  "shield":      Shield,
  "layers":      Layers,
  "boxes":       Boxes,
  "container":   Container,
  "settings":    Settings,
  "layout":      Layout,
  "zap":         Zap,
  "activity":    Activity,
  "clock":       Clock,
  "gauge":       Gauge,
  "globe":       Globe,
  "wifi":        Wifi,
  "lock":        Lock,
  "mail":        Mail,
  "external-link": ExternalLink,
  "arrow-up-right": ArrowUpRight,
  "api":         Zap,
};

const EMOJI_REGEX = /^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u200d\ufe0f]{1,}$/u;

export function isEmoji(str: string): boolean {
  return EMOJI_REGEX.test(str);
}

export function getIconComponent(name: string | null | undefined): LucideIcon {
  if (!name) return Code2;
  return ICON_MAP[name.toLowerCase()] ?? Code2;
}

export function resolveIcon(
  name: string | null | undefined,
): { type: "lucide"; component: LucideIcon } | { type: "emoji"; emoji: string } {
  if (!name) return { type: "lucide", component: Code2 };
  if (isEmoji(name)) return { type: "emoji", emoji: name };
  return { type: "lucide", component: getIconComponent(name) };
}

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);
