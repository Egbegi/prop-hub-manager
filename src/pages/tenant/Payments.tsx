
import React, { useState } from "react";
import { TenantLayout } from "@/components/layout/TenantLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Download, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Payments = () => {
  const [paymentAmount, setPaymentAmount] = useState("1200.00");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Mock payment data
  const currentBalance = {
    amount: "$1,200.00",
    dueDate: "April 1, 2025",
    status: "upcoming", // upcoming, due, overdue, paid
    daysUntilDue: 5,
  };

  const paymentHistory = [
    {
      id: 1,
      date: "Mar 1, 2025",
      amount: "$1,200.00",
      method: "Credit Card ****1234",
      status: "paid",
      type: "Monthly Rent",
      receiptId: "RCP-2025-003-001"
    },
    {
      id: 2,
      date: "Feb 1, 2025",
      amount: "$1,200.00",
      method: "Bank Transfer",
      status: "paid",
      type: "Monthly Rent",
      receiptId: "RCP-2025-002-001"
    },
    {
      id: 3,
      date: "Jan 1, 2025",
      amount: "$1,200.00",
      method: "Credit Card ****1234",
      status: "paid",
      type: "Monthly Rent",
      receiptId: "RCP-2025-001-001"
    },
    {
      id: 4,
      date: "Dec 15, 2024",
      amount: "$1,200.00",
      method: "Bank Transfer",
      status: "paid",
      type: "Security Deposit",
      receiptId: "RCP-2024-012-002"
    },
    {
      id: 5,
      date: "Dec 1, 2024",
      amount: "$1,200.00",
      method: "Credit Card ****1234",
      status: "paid",
      type: "Monthly Rent",
      receiptId: "RCP-2024-012-001"
    }
  ];

  const getPaymentStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          className: "bg-green-500/10 text-green-500 border-green-500/20",
          label: "Paid"
        };
      case "upcoming":
        return {
          icon: <Clock className="h-4 w-4" />,
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          label: "Upcoming"
        };
      case "due":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          className: "bg-primary/10 text-primary border-primary/20",
          label: "Due"
        };
      case "overdue":
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          className: "bg-destructive/10 text-destructive border-destructive/20",
          label: "Overdue"
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          className: "bg-muted/10 text-muted-foreground border-muted/20",
          label: "Unknown"
        };
    }
  };

  const handlePayment = () => {
    // Simulate payment processing
    toast({
      title: "Payment Submitted",
      description: "Your payment is being processed. You will receive a confirmation shortly.",
    });
  };

  const handleDownloadReceipt = (receiptId: string) => {
    // Simulate receipt download
    toast({
      title: "Downloading Receipt",
      description: `Receipt ${receiptId} is being downloaded.`,
    });
  };

  const currentStatus = getPaymentStatusStyles(currentBalance.status);

  return (
    <TenantLayout>
      <div className="container mx-auto py-6 px-4 max-w-screen-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Payments</h1>
          <p className="text-muted-foreground">
            Manage your rent payments, view payment history, and download receipts
          </p>
        </div>

        {/* Current Balance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Current Balance
            </CardTitle>
            <CardDescription>Your next payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold">{currentBalance.amount}</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Due on {currentBalance.dueDate}</span>
                  <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${currentStatus.className}`}>
                    {currentStatus.icon}
                    <span>{currentStatus.label}</span>
                  </div>
                </div>
                {currentBalance.status === "upcoming" && (
                  <p className="text-sm text-muted-foreground">
                    {currentBalance.daysUntilDue} days until payment is due
                  </p>
                )}
              </div>
              <Button size="lg" onClick={() => setPaymentMethod("make-payment")}>
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
          </TabsList>

          {/* Payment History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your complete payment history and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => {
                    const status = getPaymentStatusStyles(payment.status);
                    return (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-2 rounded">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{payment.type}</h4>
                              <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${status.className}`}>
                                {status.icon}
                                <span>{status.label}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {payment.date} • {payment.method}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold">{payment.amount}</div>
                            <div className="text-xs text-muted-foreground">{payment.receiptId}</div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadReceipt(payment.receiptId)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Make Payment Tab */}
          <TabsContent value="make-payment">
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>Submit your rent payment securely online</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Payment Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="1200.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="debit-card">Debit Card</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="ach">ACH Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {paymentMethod && (
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-medium">Payment Details</h4>
                    {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <Input id="card-name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    )}
                    {(paymentMethod === "bank-transfer" || paymentMethod === "ach") && (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="routing">Routing Number</Label>
                          <Input id="routing" placeholder="123456789" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account">Account Number</Label>
                          <Input id="account" placeholder="1234567890" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account-type">Account Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checking">Checking</SelectItem>
                              <SelectItem value="savings">Savings</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handlePayment} disabled={!paymentMethod} className="flex-1">
                    Submit Payment - ${paymentAmount}
                  </Button>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Save Payment Method
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>• Payments are processed securely using bank-level encryption</p>
                  <p>• You will receive a confirmation email once payment is processed</p>
                  <p>• Allow 1-2 business days for payment to reflect in your account</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TenantLayout>
  );
};

export default Payments;
