import {
  ArrowRight,
  Check,
  Shield,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FOOTBALL_STATS_URL } from "@/constants/site";

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
              <span className="text-xl font-bold">Football Manager</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#screenshots"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Screenshots
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Pricing
            </Link>
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
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
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
                src="/placeholder.svg?height=550&width=800"
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
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Management</h3>
                <p className="text-muted-foreground">
                  Build your dream team with an extensive database of real
                  players. Manage tactics, formations, and player roles to
                  create a winning strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Transfer Market</h3>
                <p className="text-muted-foreground">
                  Scout talents, negotiate contracts, and make strategic
                  signings to strengthen your squad. Compete with AI managers
                  for the best players.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Match Simulation</h3>
                <p className="text-muted-foreground">
                  Experience realistic match simulations with dynamic events and
                  tactical adaptations. Make real-time decisions to influence
                  the outcome.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Player Development</h3>
                <p className="text-muted-foreground">
                  Nurture young talents and watch them grow into superstars.
                  Customize training regimes and monitor player progress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Competitions</h3>
                <p className="text-muted-foreground">
                  Compete in domestic leagues, cups, and international
                  tournaments. Build a legacy by winning trophies and breaking
                  records.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Club Management</h3>
                <p className="text-muted-foreground">
                  Handle club finances, stadium improvements, and staff
                  recruitment. Balance short-term success with long-term
                  sustainability.
                </p>
              </CardContent>
            </Card>
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
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Match Day"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-64 object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Team Management"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-64 object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Transfer Market"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-64 object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Player Profile"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-64 object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Tactics Board"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-64 object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="League Table"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-64 object-cover"
            />
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
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The most realistic football management sim I've ever played.
                  The depth of tactics and player development is incredible."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">Michael Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Playing since 2022
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "I love how the game balances accessibility with depth. Easy
                  to pick up but with enough complexity to keep me engaged for
                  months."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">Sarah Williams</p>
                    <p className="text-sm text-muted-foreground">
                      Playing since 2023
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The transfer market and negotiations feel so realistic. I've
                  spent hours building my perfect team and watching them
                  develop."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                  <div>
                    <p className="font-medium">David Rodriguez</p>
                    <p className="text-sm text-muted-foreground">
                      Playing since 2021
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Free Plan</h3>
                <div className="text-3xl font-bold mb-4">
                  £0{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Basic team management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Standard match simulation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Limited transfer market access</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`${FOOTBALL_STATS_URL}/auth/signup`}>
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
                <div className="text-3xl font-bold mb-4">
                  £9.99{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>All Free Plan features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Advanced match tactics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Full transfer market access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Detailed player statistics</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>500 coins monthly</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href={`${FOOTBALL_STATS_URL}/auth/signup`}>
                    Subscribe Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Elite Plan</h3>
                <div className="text-3xl font-bold mb-4">
                  £19.99{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>All Pro Plan features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Elite player generation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Advanced scouting network</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Exclusive player items</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>1500 coins monthly</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`${FOOTBALL_STATS_URL}/auth/signup`}>
                    Subscribe Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`${FOOTBALL_STATS_URL}/auth/signin`}>Sign In</Link>
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
              <h3 className="text-lg font-bold mb-4">Football Manager</h3>
              <p className="text-muted-foreground">
                The ultimate football management simulation game. Build your
                legacy today.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`${FOOTBALL_STATS_URL}/auth/signup`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${FOOTBALL_STATS_URL}/auth/signin`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>© 2025 Football Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
