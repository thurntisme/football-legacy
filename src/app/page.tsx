import { ArrowRight, Check, Trophy } from "lucide-react";
import Link from "next/link";

import StarBox from "@/components/common/star-box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Features,
  FooterLinks,
  GameScreenshotUrl,
  NavLinks,
  Screenshots,
  Testimonials,
} from "@/constants/landing";
import {
  APP_DESCRIPTION,
  APP_NAME,
  FOOTBALL_STATS_URL,
} from "@/constants/site";
import { SubscriptionPlans } from "@/constants/user";
import { formatCurrency } from "@/lib/finance";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2">
            <Link
              href={FOOTBALL_STATS_URL}
              className="flex items-center space-x-2"
            >
              <Trophy className="mr-2 h-6 w-6" />
              <span className="text-xl font-bold">{APP_NAME}</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {NavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`${FOOTBALL_STATS_URL}/auth/signin`}>Sign In</Link>
            </Button>
            <Button asChild>
              <Link href={`${FOOTBALL_STATS_URL}/auth/signup`}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="mb-2">New Season 2025</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Manage Your Dream Football Team
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Experience the thrill of football management. Build your
                  squad, develop tactics, and lead your team to glory.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href={`${FOOTBALL_STATS_URL}/auth/signup`}>
                    Start Your Career
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                <span>Free to start</span>
                <Check className="ml-4 h-4 w-4 text-primary" />
                <span>No credit card required</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Football Manager Game Screenshot"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                src={
                  GameScreenshotUrl || "/placeholder.svg?height=550&width=800"
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-background" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Game Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the most realistic football management simulation with
              features designed for both casual players and hardcore
              strategists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/30" id="screenshots">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Game Screenshots
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take a look at the immersive interface and detailed gameplay
              elements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Screenshots.map((item, index) => (
              <figure
                key={index}
                className="relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl group transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.src || "/placeholder.svg?height=300&width=500"}
                  alt={item.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <figcaption className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {item.title}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-12 md:py-24 lg:py-32 bg-background"
        id="testimonials"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Players Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied managers building their football
              legacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <StarBox length={testimonial.star} />
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Playing since {testimonial.year}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/30" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select the subscription that fits your management style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SubscriptionPlans.map((plan) => (
              <Card
                key={plan.slug}
                className={`shadow-lg ${plan.isPopular ? "border-primary relative" : "border-none"}`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-4">
                    {formatCurrency(plan.price)}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature: string) => (
                      <li className="flex items-start" key={feature}>
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.isPopular ? "default" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link href={`${FOOTBALL_STATS_URL}/auth/signup`}>
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="mb-2">Get Started Today</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Build Your Football Legacy?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of managers worldwide and start your journey to
                the top.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href={`${FOOTBALL_STATS_URL}/auth/signup`}>
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`${FOOTBALL_STATS_URL}/auth/signin`}>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">{APP_NAME}</h3>
              <p className="text-muted-foreground">{APP_DESCRIPTION}</p>
            </div>
            {FooterLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>© 2025 Football Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
