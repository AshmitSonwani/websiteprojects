"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function HeroCanvas({ className }: { className?: string }) {
  return <HeroScene className={className} />;
}
