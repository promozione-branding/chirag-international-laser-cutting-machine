import {
  Award, Barcode, Box, Cog, Cpu, Crosshair, Droplets, Factory, Gauge, Gift, Gem,
  Layers, Leaf, Monitor, Package, Plug, Pointer, Rocket, Ruler, Scissors,
  Settings, Shield, ShieldCheck, Shirt, Sparkles, Stamp, Tag, Target, TreePine,
  Trophy, Wind, Wrench, Zap,
} from "lucide-react";

/*
  Icon names used inside lib/products.js  →  lucide-react components.
  To use a new icon in the data file, import it above and add it here.
*/
export const ICONS = {
  award: Award,
  barcode: Barcode,
  box: Box,
  cog: Cog,
  cpu: Cpu,
  crosshair: Crosshair,
  droplets: Droplets,
  factory: Factory,
  gauge: Gauge,
  gem: Gem,
  gift: Gift,
  layers: Layers,
  leaf: Leaf,
  monitor: Monitor,
  package: Package,
  plug: Plug,
  pointer: Pointer,
  rocket: Rocket,
  ruler: Ruler,
  scissors: Scissors,
  settings: Settings,
  shield: Shield,
  shieldcheck: ShieldCheck,
  shirt: Shirt,
  sparkles: Sparkles,
  stamp: Stamp,
  tag: Tag,
  target: Target,
  tree: TreePine,
  trophy: Trophy,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
};

export function Icon({ name, size = 20, className = "", strokeWidth = 1.8 }) {
  const Cmp = ICONS[name] || Settings;
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden />;
}
