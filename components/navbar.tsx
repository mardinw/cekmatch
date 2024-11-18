"use client"
import { AirVent } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';

export default function Navbar() {

    const baseUrl = authClient.baseURL;
    const router = useRouter();    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isActive, setIsActive] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const isAccessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

    const handleLogout = () => {
        if (!isAccessToken || isAccessToken === 'undefined') {
            console.error('Data sesi tidak ditemukan');
            return;
        }

        fetch(`${baseUrl}/v1/signout`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${isAccessToken}`,
            },
        })
        .then((res) => {
            if (res.ok) {
                console.log('Logout berhasil');
            } else {
                console.error('Gagal melakukan logout');
            }
            localStorage.removeItem('access_token');
            router.push('/signin');
        })
        .catch((error) => console.error('Error:', error));
    };

    useEffect(() => {
        if (isAccessToken && isAccessToken !== 'undefined') {
            const decoded = jwt.decode(isAccessToken);
            if (decoded && typeof decoded === 'object' && 'role' in decoded) {
                if(decoded.role === 'admin') {
                    setIsAdmin(true);
                } else if (decoded.role === 'user') {
                    setIsAdmin(false);
                }
            }
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [isAccessToken]);

    return (
        <>
        <div className="border-b px-4">
            <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
                <Link href='/' className="flex items-center gap-2">
                    <AirVent className="h-6 w-6"/>
                    <span className="font-bold">Check Match.</span>
                </Link>
                <div>
                    {isAdmin ? (
                    <>
                    <Button variant={'sky'} className="mx-2" onClick={() => router.push('/dashboard')}>
                        Dashboard
                    </Button>
                    <Button variant={'sky'} className="mx-2"
                    onClick={() => router.push('/users')}>
                        List User
                    </Button>
                    </>
                    ) : (
                    <Button variant={'sky'} className="mx-2"
                    onClick={() => router.push('/dashboard')}>
                        Dashboard
                    </Button>
                    )
                    }
                    { isActive ? (
                        <Button onClick={handleLogout} variant={'green'}>Sign Out</Button>
                    ): 
                    <Link href="/signin" className={buttonVariants()}>Sign In</Link>
                    }
                </div>
            </div>
        </div>
        </>
    )
}