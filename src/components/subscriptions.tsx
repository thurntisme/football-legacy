import React from 'react';

import { Check } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {};

const Subscriptions = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Choose Your Subscription Plan</CardTitle>
          <CardDescription>
            Upgrade your Football Manager experience with premium features and
            benefits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Free Plan</CardTitle>
                <CardDescription>Basic features to get started</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="text-3xl font-bold mb-4">
                  £0{' '}
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
                  £9.99{' '}
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
                  £19.99{' '}
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
                  <td className="text-center py-3 px-4">Priority Access</td>
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
                You can upgrade your subscription at any time by selecting your
                desired plan on this page and following the payment process.
                Your new benefits will be available immediately after successful
                payment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time. Your benefits
                will remain active until the end of your current billing period.
                To cancel, go to your account settings and select "Manage
                Subscription."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                When do I receive my monthly coins?
              </AccordionTrigger>
              <AccordionContent>
                Monthly coins are credited to your account on the first day of
                each billing cycle. For example, if you subscribed on the 15th
                of the month, you'll receive your coins on the 15th of each
                subsequent month.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Is there a discount for annual subscriptions?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 20% discount when you choose annual billing for
                any of our subscription plans. This option will be available
                during the checkout process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards (Visa, Mastercard, American
                Express), PayPal, and Apple Pay. For some regions, we also
                support local payment methods.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscriptions;
