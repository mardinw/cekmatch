"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signInFormSchema } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as jwt from 'jsonwebtoken';

export default function SignIn() {


    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const [errorMessage, setError] = useState<string>("");
    const router = useRouter();


    async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        const { username, password} = values;
        try {
            const res = await fetch(`${authClient.baseURL}/v1/signin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if(!res.ok) {
                if(res.status === 403) {
                    setError("Akun belum aktif. Silahkan kontak Administrator");
                    form.reset();
                    return;
                } else if(res.status === 401) {
                    setError("Akun belum terdaftar. Silahkan daftar terlebih dahulu");
                    form.reset();
                    return;
                }
            }
            const data = await res.json();
            localStorage.setItem('access_token', data.token);

            const decoded = jwt.decode(data.token);
            if(decoded &&  typeof decoded === 'object' && 'role' in decoded) {

                if(decoded.role === 'admin') {
                    router.push('/users');
                } else if(decoded.role === 'user') {
                    router.push('/dashboard');
                }
            }

            toast({
                title: "Please wait...",
            });
        } catch(err) {
            console.error('Login failed:', err);
            setError(`Gagal Masuk. Silahkan coba hubungi Admin`);
        }
    }

  return (
    <Card>
        <CardHeader className="w-full max-w-md mx-auto">
            <CardTitle>Portal Masuk</CardTitle>
            <CardDescription>
                Selamat Datang Kembali. Slahkan masuk bila ingin melanjutkan.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="username"
                        render={( {field} ) => (
                            <FormItem>
                                <FormLabel>Nama Pengguna</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="your username" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={( {field} ) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="your password" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {errorMessage && <p className="text-error">{errorMessage}</p>}
                    <Button className="w-full" variant={'sky'} type="submit">Masuk</Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
                Belum punya akun?{' '}
                <Link href='/signup' className="text-primary hover:underline">Daftar</Link>
            </p>
        </CardFooter>
    </Card>

  );
}
