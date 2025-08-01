'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Info } from '@/app/(protected)/client/store-client/checkout/order-placed/components/info';
import { Payment } from '@/app/(protected)/client/store-client/checkout/order-placed/components/payment';
import { Order } from '@/app/(protected)/client/store-client/checkout/order-summary/components/order';
import { Card4 } from '@/app/(protected)/client/store-client/components/common/card4';

export function OrderPlacedContent() {
  return (
    <div className="grid xl:grid-cols-3 gap-5 lg:gap-9">
      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-1 gap-5 lg:gap-9">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-normal text-secondary-foreground">
                    Order ID
                  </span>
                  <span className="text-sm font-medium text-mono">
                    X319330-S24
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-normal text-secondary-foreground">
                    Order placed
                  </span>
                  <span className="text-sm font-medium text-mono">
                    26 June, 2025
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-normal text-secondary-foreground">
                    Total
                  </span>
                  <span className="text-sm font-medium text-mono">$512.60</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-normal text-secondary-foreground">
                    Ship to
                  </span>
                  <span className="text-sm font-medium text-mono">
                    Jeroen van Dijk
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-normal text-secondary-foreground">
                    Estimated Delivery
                  </span>
                  <span className="text-sm font-medium text-mono">
                    07 July, 2025
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-5 lg:p-7.5 space-y-5">
                <Card4 limit={4} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:gap-9">
            <Payment />
            <Info />
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="space-y-5">
          <Order />
        </div>
      </div>
    </div>
  );
}
