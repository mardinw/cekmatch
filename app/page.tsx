"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const isAccessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  const isAuthorize = () => {
    if (isAccessToken) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  }

  // cek kondisinya pakai useEffect
  useEffect(() =>{
    isAuthorize();
  })
}
