"use client";

import {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar, Mail, MapPin, Phone, User} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Customer = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  phone: string;
  address: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4">Loading customers...</div>;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <User className="w-6 h-6 text-muted-foreground"/>
        Customers
      </h1>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer, index) => (
            <Card key={customer.id ?? index} className="rounded-2xl shadow-sm">
              <CardContent className="p-4 space-y-2">
                <p className="flex items-center gap-2 font-semibold">
                  <User className="w-4 h-4 text-muted-foreground"/>
                  {customer.name}
                </p>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
                <p className="text-xs text-muted-foreground">
                  Joined: {new Date(customer.createdAt).toLocaleDateString()}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog for customer details */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg font-bold">
                  <User className="w-5 h-5 text-muted-foreground"/>
                  {selectedCustomer.name}
                </DialogTitle>
                <DialogDescription>
                  Detailed information about this customer.
                </DialogDescription>
              </DialogHeader>

              {/* Customer info list */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground"/>
                  <span className="font-semibold">Email:</span>
                  <span className="text-muted-foreground">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground"/>
                  <span className="font-semibold">Phone:</span>
                  <span className="text-muted-foreground">
              {selectedCustomer.phone ?? "N/A"}
            </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground"/>
                  <span className="font-semibold">Address:</span>
                  <span className="text-muted-foreground">
              {selectedCustomer.address ?? "N/A"}
            </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground"/>
                  <span className="font-semibold">Joined:</span>
                  <span className="text-muted-foreground">
              {new Date(selectedCustomer.createdAt).toLocaleString()}
            </span>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setSelectedCustomer(null)} variant="outline">
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
