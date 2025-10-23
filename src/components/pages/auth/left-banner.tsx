import React from "react";

import { Trophy } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/common/logo";
import { Testimonials } from "@/constants/landing";
import { APP_NAME, FOOTBALL_STATS_URL } from "@/constants/site";

type Props = {};

const LeftBanner = (props: Props) => {
  const testimonial = Testimonials[Testimonials.length - 1];

  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-900">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Authentication background"
          className="h-full w-full object-cover opacity-20"
        />
      </div>
      <Logo mode="light" className="z-20" />
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">"{testimonial.comment}"</p>
          <footer className="text-sm">{testimonial.name}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default LeftBanner;
