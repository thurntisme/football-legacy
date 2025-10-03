import {
  ArrowLeft,
  Check,
  Coins,
  CreditCard,
  DollarSign,
  Gem,
  Gift,
  Info,
  ShoppingBag,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

import PageTitle from "@/components/common/page-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PaymentPage() {
  return (
    <>
      <PageTitle title="Payment & Subscriptions">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </PageTitle>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="coins">Buy Coins</TabsTrigger>
          <TabsTrigger value="transfer-funds">Transfer Funds</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Choose Your Subscription Plan</CardTitle>
                <CardDescription>
                  Upgrade your Football Manager experience with premium features
                  and benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Free Plan */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">Free Plan</CardTitle>
                      <CardDescription>
                        Basic features to get started
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
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
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span>Basic player development</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Current Plan
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Pro Plan */}
                  <Card className="border-primary">
                    <CardHeader className="pb-3 bg-primary/5">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">Pro Plan</CardTitle>
                        <Badge>Popular</Badge>
                      </div>
                      <CardDescription>
                        Enhanced features for serious managers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
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
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span>Ad-free experience</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Subscribe Now</Button>
                    </CardFooter>
                  </Card>

                  {/* Elite Plan */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">Elite Plan</CardTitle>
                      <CardDescription>
                        Premium experience for elite managers
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
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
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span>Priority customer support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Subscribe Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Subscription Benefits</CardTitle>
                <CardDescription>
                  Compare the benefits of each subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Feature</th>
                        <th className="text-center py-3 px-4">Free</th>
                        <th className="text-center py-3 px-4">Pro</th>
                        <th className="text-center py-3 px-4">Elite</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Team Management</td>
                        <td className="text-center py-3 px-4">Basic</td>
                        <td className="text-center py-3 px-4">Advanced</td>
                        <td className="text-center py-3 px-4">Premium</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Match Simulation</td>
                        <td className="text-center py-3 px-4">Standard</td>
                        <td className="text-center py-3 px-4">Advanced</td>
                        <td className="text-center py-3 px-4">Premium</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Transfer Market</td>
                        <td className="text-center py-3 px-4">Limited</td>
                        <td className="text-center py-3 px-4">Full Access</td>
                        <td className="text-center py-3 px-4">
                          Priority Access
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Player Development</td>
                        <td className="text-center py-3 px-4">Basic</td>
                        <td className="text-center py-3 px-4">Advanced</td>
                        <td className="text-center py-3 px-4">Elite</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Monthly Coins</td>
                        <td className="text-center py-3 px-4">0</td>
                        <td className="text-center py-3 px-4">500</td>
                        <td className="text-center py-3 px-4">1500</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Player Items</td>
                        <td className="text-center py-3 px-4">Common Only</td>
                        <td className="text-center py-3 px-4">Up to Rare</td>
                        <td className="text-center py-3 px-4">All Rarities</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Ad Experience</td>
                        <td className="text-center py-3 px-4">With Ads</td>
                        <td className="text-center py-3 px-4">Ad-Free</td>
                        <td className="text-center py-3 px-4">Ad-Free</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Customer Support</td>
                        <td className="text-center py-3 px-4">Standard</td>
                        <td className="text-center py-3 px-4">Priority</td>
                        <td className="text-center py-3 px-4">VIP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions about our subscription plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How do I upgrade my subscription?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can upgrade your subscription at any time by selecting
                      your desired plan on this page and following the payment
                      process. Your new benefits will be available immediately
                      after successful payment.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Can I cancel my subscription?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, you can cancel your subscription at any time. Your
                      benefits will remain active until the end of your current
                      billing period. To cancel, go to your account settings and
                      select "Manage Subscription."
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      When do I receive my monthly coins?
                    </AccordionTrigger>
                    <AccordionContent>
                      Monthly coins are credited to your account on the first
                      day of each billing cycle. For example, if you subscribed
                      on the 15th of the month, you'll receive your coins on the
                      15th of each subsequent month.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      Is there a discount for annual subscriptions?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer a 20% discount when you choose annual
                      billing for any of our subscription plans. This option
                      will be available during the checkout process.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      What payment methods do you accept?
                    </AccordionTrigger>
                    <AccordionContent>
                      We accept all major credit cards (Visa, Mastercard,
                      American Express), PayPal, and Apple Pay. For some
                      regions, we also support local payment methods.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coins" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Buy Game Coins</CardTitle>
                <CardDescription>
                  Purchase coins to unlock premium features and items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Coin Package 1 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Gem className="h-5 w-5 mr-2 text-amber-400" />
                        Starter Pack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">500</div>
                        <div className="text-sm text-muted-foreground">
                          Coins
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £4.99
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Coin Package 2 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Gem className="h-5 w-5 mr-2 text-amber-400" />
                        Popular Pack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">1,200</div>
                        <div className="text-sm text-muted-foreground">
                          Coins
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £9.99
                      </div>
                      <Badge
                        className="w-full justify-center"
                        variant="secondary"
                      >
                        10% Extra
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Buy Now</Button>
                    </CardFooter>
                  </Card>

                  {/* Coin Package 3 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Gem className="h-5 w-5 mr-2 text-amber-400" />
                        Value Pack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">2,500</div>
                        <div className="text-sm text-muted-foreground">
                          Coins
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £19.99
                      </div>
                      <Badge
                        className="w-full justify-center"
                        variant="secondary"
                      >
                        15% Extra
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Coin Package 4 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Gem className="h-5 w-5 mr-2 text-amber-400" />
                        Premium Pack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">5,500</div>
                        <div className="text-sm text-muted-foreground">
                          Coins
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £39.99
                      </div>
                      <Badge
                        className="w-full justify-center"
                        variant="secondary"
                      >
                        25% Extra
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>What You Can Buy With Coins</CardTitle>
                <CardDescription>
                  Enhance your gameplay with premium features and items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Premium Player Packs</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlock high-rated players to strengthen your squad
                      </p>
                      <div className="mt-1 text-sm font-medium">
                        From 300 coins
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Training Boosts</h3>
                      <p className="text-sm text-muted-foreground">
                        Accelerate player development and attribute improvements
                      </p>
                      <div className="mt-1 text-sm font-medium">
                        From 100 coins
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Transfer Budget Boosts</h3>
                      <p className="text-sm text-muted-foreground">
                        Increase your transfer budget to sign better players
                      </p>
                      <div className="mt-1 text-sm font-medium">
                        From 500 coins
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Advanced Scouting Reports</h3>
                      <p className="text-sm text-muted-foreground">
                        Get detailed information on potential transfer targets
                      </p>
                      <div className="mt-1 text-sm font-medium">
                        From 200 coins
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Coin Balance</CardTitle>
                <CardDescription>
                  Current balance and transaction history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Gem className="h-10 w-10 text-amber-400 mx-auto mb-2" />
                  <div className="text-4xl font-bold">250</div>
                  <div className="text-sm text-muted-foreground">
                    Available Coins
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Recent Transactions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                      <div>
                        <div className="font-medium">Starter Pack Purchase</div>
                        <div className="text-xs text-muted-foreground">
                          Mar 15, 2025
                        </div>
                      </div>
                      <div className="text-green-600 font-medium">+500</div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                      <div>
                        <div className="font-medium">Training Boost</div>
                        <div className="text-xs text-muted-foreground">
                          Mar 16, 2025
                        </div>
                      </div>
                      <div className="text-red-600 font-medium">-150</div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                      <div>
                        <div className="font-medium">Player Pack</div>
                        <div className="text-xs text-muted-foreground">
                          Mar 18, 2025
                        </div>
                      </div>
                      <div className="text-red-600 font-medium">-100</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transfer-funds" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Transfer Market Funds
                </CardTitle>
                <CardDescription>
                  Purchase funds specifically for the transfer market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Transfer Fund Package 1 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Coins className="h-5 w-5 mr-2 text-green-500" />
                        Small Budget
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">$5M</div>
                        <div className="text-sm text-muted-foreground">
                          Transfer Budget
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £4.99
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Transfer Fund Package 2 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Coins className="h-5 w-5 mr-2 text-green-500" />
                        Medium Budget
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">$15M</div>
                        <div className="text-sm text-muted-foreground">
                          Transfer Budget
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £9.99
                      </div>
                      <Badge
                        className="w-full justify-center"
                        variant="secondary"
                      >
                        10% Extra
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Buy Now</Button>
                    </CardFooter>
                  </Card>

                  {/* Transfer Fund Package 3 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Coins className="h-5 w-5 mr-2 text-green-500" />
                        Large Budget
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">$40M</div>
                        <div className="text-sm text-muted-foreground">
                          Transfer Budget
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £19.99
                      </div>
                      <Badge
                        className="w-full justify-center"
                        variant="secondary"
                      >
                        15% Extra
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Transfer Fund Package 4 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Coins className="h-5 w-5 mr-2 text-green-500" />
                        Elite Budget
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold">$100M</div>
                        <div className="text-sm text-muted-foreground">
                          Transfer Budget
                        </div>
                      </div>
                      <div className="text-center text-xl font-bold mb-4">
                        £39.99
                      </div>
                      <Badge
                        className="w-full justify-center"
                        variant="secondary"
                      >
                        25% Extra
                      </Badge>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Buy Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Transfer Market Benefits</CardTitle>
                <CardDescription>
                  How additional funds can improve your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sign Star Players</h3>
                      <p className="text-sm text-muted-foreground">
                        Acquire top talent that would otherwise be out of your
                        budget range
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Invest in Young Talent</h3>
                      <p className="text-sm text-muted-foreground">
                        Build for the future by signing promising youngsters
                        with high potential
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Quick Squad Improvement</h3>
                      <p className="text-sm text-muted-foreground">
                        Immediately strengthen weak positions without waiting to
                        generate funds
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wage Budget Increase</h3>
                      <p className="text-sm text-muted-foreground">
                        Each package also includes a proportional increase to
                        your wage budget
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Club Finances</CardTitle>
                <CardDescription>
                  Your available transfer and wage budgets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Transfer Budget</h3>
                      <span className="font-bold text-green-600">
                        $12,500,000
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      25% of average top division club
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Wage Budget</h3>
                      <span className="font-bold text-amber-600">
                        $120,000 / week
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      30% of average top division club
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">
                      Recent Transfer Activity
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                        <div>
                          <div className="font-medium">James Wilson (OUT)</div>
                          <div className="text-xs text-muted-foreground">
                            To Manchester City
                          </div>
                        </div>
                        <div className="text-green-600 font-medium">+$8.5M</div>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                        <div>
                          <div className="font-medium">Carlos Mendez (IN)</div>
                          <div className="text-xs text-muted-foreground">
                            From Atletico Madrid
                          </div>
                        </div>
                        <div className="text-red-600 font-medium">-$12M</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/market">Visit Transfer Market</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Your Payment Methods
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-muted">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">Visa ending in 4242</div>
                          <div className="text-sm text-muted-foreground">
                            Expires 05/2026
                          </div>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-muted">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Mastercard ending in 8888
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Expires 09/2025
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Set as Default
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-4">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">
                    Add New Payment Method
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input id="card-name" placeholder="John Smith" />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="4242 4242 4242 4242"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>

                    <RadioGroup
                      defaultValue="credit"
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="credit"
                          id="credit"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="credit"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          Credit Card
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="paypal"
                          id="paypal"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="paypal"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            className="mb-3 h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.4 3H16.2C17.1 3 17.9 3.3 18.5 3.9C19.1 4.5 19.3 5.3 19.2 6.3C18.8 10.2 16.1 12 12.7 12H9.7C9.2 12 8.8 12.4 8.7 12.9L7.6 19.7C7.5 20.1 7.2 20.4 6.8 20.4H3.5C3.1 20.4 2.8 20 2.9 19.6L5.4 3.9C5.5 3.4 5.9 3 6.4 3H7.4Z"
                              fill="#0070BA"
                            />
                            <path
                              d="M19.2 6.3C19.8 8.2 19.3 9.5 18.5 10.5C17.3 12 15.3 12.6 12.7 12.6H9.7C9.2 12.6 8.8 13 8.7 13.5L7.6 20.3C7.5 20.7 7.2 21 6.8 21H3.5C3.1 21 2.8 20.6 2.9 20.2L5.4 4.5C5.5 4 5.9 3.6 6.4 3.6H16.2C17.1 3.6 17.9 3.9 18.5 4.5C18.9 5 19.1 5.6 19.2 6.3Z"
                              fill="#003087"
                            />
                          </svg>
                          PayPal
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="apple"
                          id="apple"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="apple"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <svg
                            className="mb-3 h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.0001 5.42C17.8401 4.36 17.5201 2.76 16.8001 1.72C16.0801 0.68 14.6001 0.12 13.6001 0.68C12.6001 1.24 12.2401 2.76 12.9601 3.8C13.6801 4.84 15.1601 5.4 16.1601 4.84C16.4001 5.04 16.7201 5.24 17.0001 5.42Z"
                              fill="black"
                            />
                            <path
                              d="M21.8 15.96C21.68 15.64 19.92 14.44 19.92 11.56C19.92 9.04 21.32 7.72 21.44 7.6C20.56 6.24 19.12 6 18.6 6C17.24 6 16.52 6.72 15.68 6.72C14.76 6.72 13.68 6 12.56 6C10.88 6 9.08 7.28 8.08 9.28C6.68 12.16 7.76 16.56 9.08 19.08C9.76 20.32 10.56 21.72 11.64 21.68C12.68 21.64 13.08 21.04 14.32 21.04C15.56 21.04 15.92 21.68 17.04 21.68C18.16 21.68 18.88 20.44 19.52 19.2C20.28 17.8 20.6 16.44 20.6 16.32C20.6 16.32 20.56 16.28 20.52 16.24C20.52 16.24 18.72 15.48 18.68 13C18.64 10.92 20.04 10.04 20.08 10C19.04 8.52 17.4 8.4 16.92 8.36C15.56 8.2 14.32 9.12 13.72 9.12C13.08 9.12 12.04 8.36 10.52 8.36C9.92 8.36 7.4 8.48 6.08 10.6C5.92 10.84 4.68 12.96 4.68 16.08C4.68 19.96 7.28 23.64 8.68 23.64C9.52 23.64 10.64 22.8 11.52 22.8C12.36 22.8 13.28 23.64 14.32 23.64C15.36 23.64 16.4 22.68 17.24 21.84C18.32 20.72 19.16 19.04 19.52 17.68C19.52 17.68 21.92 16.28 21.8 15.96Z"
                              fill="black"
                            />
                          </svg>
                          Apple Pay
                        </Label>
                      </div>
                    </RadioGroup>

                    <Button className="w-full">Save Payment Method</Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" placeholder="123 Main St" />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input id="state" placeholder="NY" />
                      </div>
                      <div>
                        <Label htmlFor="zip">Zip/Postal Code</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="United States" />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Update Billing Address
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
