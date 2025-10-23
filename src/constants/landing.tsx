import { Shield, Star, TrendingUp, Trophy, Users, Zap } from "lucide-react";

import { FOOTBALL_STATS_URL } from "./site";

export const NavLinks = [
  { label: "Features", href: "#features" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

export const GameScreenshotUrl = "";

export const Features = [
  {
    icon: Users,
    title: "Team Management",
    description:
      "Build your dream team with an extensive database of real players. Manage tactics, formations, and player roles to create a winning strategy.",
  },
  {
    icon: TrendingUp,
    title: "Transfer Market",
    description:
      "Scout talents, negotiate contracts, and make strategic signings to strengthen your squad. Compete with AI managers for the best players.",
  },
  {
    icon: Zap,
    title: "Match Simulation",
    description:
      "Experience realistic match simulations with dynamic events and tactical adaptations. Make real-time decisions to influence the outcome.",
  },
  {
    icon: Star,
    title: "Player Development",
    description:
      "Nurture young talents and watch them grow into superstars. Customize training regimes and monitor player progress.",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Compete in domestic leagues, cups, and international tournaments. Build a legacy by winning trophies and breaking records.",
  },
  {
    icon: Shield,
    title: "Club Management",
    description:
      "Handle club finances, stadium improvements, and staff recruitment. Balance short-term success with long-term sustainability.",
  },
];

export const Screenshots = [
  { title: "Match Day", src: "" },
  { title: "Team Management", src: "" },
  { title: "Transfer Market", src: "" },
  { title: "Player Profile", src: "" },
  { title: "Tactics Board", src: "" },
  { title: "League Table", src: "" },
];

export const Testimonials = [
  {
    name: "Michael Johnson",
    star: 5,
    year: 2024,
    comment:
      "The most realistic football management sim I've ever played. The depth of tactics and player development is incredible.",
  },
  {
    name: "Emma Smith",
    star: 5,
    year: 2023,
    comment:
      "I love the transfer market. The AI players and managers make it challenging and exciting. It's like being a real football agent.",
  },
  {
    name: "David Lee",
    star: 5,
    year: 2022,
    comment:
      "The match simulation is so realistic. It's like I'm actually managing a real football club. The dynamic events are fantastic.",
  },
];

export const FooterLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Sign Up", href: `${FOOTBALL_STATS_URL}/auth/signup` },
      { label: "Sign In", href: `${FOOTBALL_STATS_URL}/auth/signin` },
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];
