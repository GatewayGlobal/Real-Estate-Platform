import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface Unit {
  id: string;
  unit_number: string;
  property_id: string;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
}

const leaseFormSchema = z.object({
  unit_id: z.string().uuid("Invalid unit ID"),
  tenant_id: z.string().uuid("Invalid tenant ID"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  monthly_rent: z.number().min(0, "Monthly rent must be a positive number"),
  status: z.enum(["pending", "active", "expired"]).default("pending"),
});

type LeaseFormValues = z.infer<typeof leaseFormSchema>;

interface LeaseFormProps {
  onSubmit: (data: LeaseFormValues) => void;
  initialData?: Partial<LeaseFormValues>;
}

export function LeaseForm({ onSubmit, initialData }: LeaseFormProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch available units
        const { data: unitsData, error: unitsError } = await supabase
          .from("units")
          .select("id, unit_number, property_id")
          .eq("status", "vacant");
        if (unitsError) throw unitsError;
        if (unitsData) setUnits(unitsData);

        // Fetch available tenants
        const { data: tenantsData, error: tenantsError } = await supabase
          .from("tenants")
          .select("id, name, email")
          .not("id", "in", `(select tenant_id from leases where status = 'active')`);
        if (tenantsError) throw tenantsError;
        if (tenantsData) setTenants(tenantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const form = useForm<LeaseFormValues>({
    resolver: zodResolver(leaseFormSchema),
    defaultValues: {
      unit_id: initialData?.unit_id || "",
      tenant_id: initialData?.tenant_id || "",
      start_date: initialData?.start_date || "",
      end_date: initialData?.end_date || "",
      monthly_rent: initialData?.monthly_rent || 0,
      status: initialData?.status || "pending",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="unit_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.unit_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tenant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tenant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tenant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name} ({tenant.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthly_rent"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Monthly Rent</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter monthly rent amount"
                  onChange={(e) => onChange(parseFloat(e.target.value))}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lease status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
