import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

/**
 * 🔴 THIS LINE IS THE KEY FIX
 * It tells Next.js NOT to prerender this page
 */
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}