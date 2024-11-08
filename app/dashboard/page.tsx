"use client"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Dashboard() {
    const router = useRouter();

    const baseUrl = authClient.baseURL;

    const isAccessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    const isAuthorize = () => {
        if (!isAccessToken || isAccessToken === 'undefined') {
            router.push('/signin');
        }
    }

    useEffect(() => {
        isAuthorize();
    });

    return (
    <div className=" text-center">
        <h1 className="text-2xl font-bold underline">Welcome to dashboard</h1>
    </div>
  );
}
