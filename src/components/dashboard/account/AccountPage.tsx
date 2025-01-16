import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield, Check } from "lucide-react";

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <Check className="h-4 w-4 text-primary" />
    <span className="text-sm">{children}</span>
  </div>
);

const AccountPage = () => {
  const { profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    company: profile?.company || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <Badge variant="secondary" className="text-sm">
          {(profile?.subscription_plan || "free").toUpperCase()} Plan
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Subscription Details */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Current Plan</p>
                <p className="text-2xl font-bold text-primary">
                  {(profile?.subscription_plan || "free")
                    .charAt(0)
                    .toUpperCase() +
                    (profile?.subscription_plan || "free").slice(1)}
                </p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Plan Features</p>
                <div className="space-y-2">
                  <PlanFeature>Unlimited Properties</PlanFeature>
                  <PlanFeature>Advanced Analytics</PlanFeature>
                  <PlanFeature>24/7 Support</PlanFeature>
                  <PlanFeature>Custom Reporting</PlanFeature>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      •••• {profile?.card_last4 || ""}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Next Billing Date</p>
                <p className="text-sm text-muted-foreground">
                  {profile?.next_billing_date || "Not available"}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Button className="w-full" variant="outline">
                Change Plan
              </Button>
              <Button
                variant="ghost"
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Cancel Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountPage;
