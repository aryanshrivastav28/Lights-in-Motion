import React from "react";
import { StorefrontCatalog } from "@/components/store/StorefrontCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardware Store | LIGHTINMOTION",
  description:
    "Explore cinema-grade ambient lighting hardware, zero-latency sync boxes, cloud lights, and custom display backlights.",
};

export default function StorePage() {
  return <StorefrontCatalog />;
}
