import React, { Suspense } from 'react';
import OrderPlacedClient from './OrderPlacedClient';

export const dynamic = 'force-dynamic';

export default function OrderPlacedPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <OrderPlacedClient />
    </Suspense>
  );
}
