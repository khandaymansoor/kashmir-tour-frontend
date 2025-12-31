"use client";

import { Suspense } from "react";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p style={{ padding: "40px" }}>Loading checkout...</p>}>
      <CheckoutForm />
    </Suspense>
  );
}
