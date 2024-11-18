"use client"
import React, { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import { useRouter } from "next/navigation";
import DataTableListUsers from "./dataTableListUsers";

export default function Users() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // Ambil token dari localStorage setelah komponen ter-mount
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token && token !== 'undefined') {
            setAccessToken(token);
        } else {
            router.push('/signin'); // Redirect jika token tidak ada atau tidak valid
        }
    }, [router]);

    // Cek token yang telah disimpan dalam state
    useEffect(() => {
        if (accessToken) {
            const decoded = jwt.decode(accessToken);
            if (decoded && typeof decoded === 'object' && 'role' in decoded) {
                if (decoded.role === 'admin') {
                    router.push('/users');
                } else if (decoded.role === 'user') {
                    router.push('/dashboard');
                }
            }
        }
    }, [accessToken, router]);

    if (!accessToken) {
      return null; // Jangan render apapun jika token belum siap
    }

    return (
      <>
        <div className=" text-center">
            <h1 className="text-2xl font-bold underline">Welcome to Administrator</h1>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <DataTableListUsers />
        </div>
      </>
  );
}
