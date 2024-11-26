"use client"
import { AirVent, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useSelection } from "@/lib/context/selection";



export default function Navbar() {

    const baseUrl = authClient.baseURL;
    const router = useRouter();    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isActive, setIsActive] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const {
        setOpenDialogChangePassword
    } = useSelection();

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

    const handleOpenDialog = () => {
        setOpenDialogChangePassword(true);
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
                <Link href='/' className="flex items-center gap-4">
                    <AirVent className="h-6 w-6"/>
                    <span className="font-bold">Check Match.</span>
                </Link>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => router.push('/dashboard')}>Dashboard</MenubarTrigger>
                    </MenubarMenu>
                    {!isAdmin && 
                        <MenubarMenu>
                            <MenubarTrigger onClick={() => router.push('/profile')}>Profile</MenubarTrigger>
                        </MenubarMenu>
                    }
                    {isAdmin && 
                        <>
                            <MenubarMenu>
                                <MenubarTrigger onClick={() => router.push('/subscriptions')}>Subscriptions</MenubarTrigger>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger onClick={() => router.push('/users')}>List Pengguna</MenubarTrigger>
                            </MenubarMenu>
                        </>
                    }
                    <MenubarMenu>
                        <MenubarTrigger>
                            <CircleUserRound />
                        </MenubarTrigger>
                        <MenubarContent>
                        <MenubarItem onClick={handleOpenDialog}>Ubah Password</MenubarItem>
                        <MenubarSeparator />
                        {isActive &&
                            <MenubarItem onClick={handleLogout}>Keluar</MenubarItem>
                        }
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

            </div>
        </div>
        </>
    )
}