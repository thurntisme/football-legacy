"use client";

import React, { useState } from "react";

import { CreditCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {};

const PaymentMethods = (props: Props) => {
  const [addCardOpen, setAddCardOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Manage your payment methods and billing information
            </CardDescription>
          </div>
          <Dialog open={addCardOpen} onOpenChange={setAddCardOpen}>
            <DialogTrigger asChild>
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Payment Method</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">
                    Payment Information
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
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
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
                <div className="flex gap-2">
                  <Badge>Default</Badge>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Mastercard ending in 8888</div>
                    <div className="text-sm text-muted-foreground">
                      Expires 09/2025
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Set as Default
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
