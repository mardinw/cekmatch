"use client"
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Dashboard() {
    const router = useRouter();

    const baseUrl = authClient.baseURL;
    const [isError, setError] = useState<string|null>(null);
    const [isFile, setFile] = useState<string[]>([]);

    const isAccessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    const isListFile = async () => {
        if (!isAccessToken || isAccessToken === 'undefined') {
            router.push('/signin');
        }
          // Fetch untuk mengecek validitas token
          try {
            const response = await fetch(`${baseUrl}/v1/data`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${isAccessToken}`
                }
            });

            if (response.status !== 200) {
                // Jika token tidak valid, redirect ke halaman login
                localStorage.removeItem('access_token');
                router.push('/signin');
            }
        } catch (error) {
            console.error('Error validating token:', error);
            // Jika ada error saat fetch, juga redirect ke halaman login
            localStorage.removeItem('access_token');
            router.push('/signin');
        }
    }

    useEffect(() => {
        isListFile();
    });

    return (
    <div className=" text-center">
        <h1 className="text-2xl font-bold underline">Welcome to dashboard</h1>
    </div>
  );
}
