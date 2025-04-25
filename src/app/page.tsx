'use client'

import { MainHeader, Tasks, UserProfile } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard/inbox')
  }, [])

  return (
    <main className="bg-gray-800 text-white">
      {/* <Tasks /> */}
      {/* <MainHeader /> */}
    </main>
  );
}
