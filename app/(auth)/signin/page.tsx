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

export default function SignIn() {

    const baseUrl = authClient.baseURL;

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const [errorMessage, setError] = useState<string>("");
    const router = useRouter();
    async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        const { email, password} = values;
        try {
            const res = await fetch(`${baseUrl}/v1/signin`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if(!res.ok) {
                if(res.status === 404) {
                    setError("Password dan Email tidak cocok");
                    form.reset();
                    return;
                }
            }
            const data = await res.json();
            localStorage.setItem('access_token', data.token);
            toast({
                title: "Please wait...",
            });

            router.push('/dashboard');
        } catch(err) {
            console.error('Login failed:', err);
            setError('Login failed. Please check your credentials');
        }
    }

  return (
    <Card>
        <CardHeader className="w-full max-w-md mx-auto">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
                Welcome back! Please sign in to continue.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="email"
                        render={( {field} ) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john@email.com" {...field} />
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
                    <Button className="w-full" type="submit">Submit</Button>
                </form>
            </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
                Don&apos;t have an account type?{' '}
                <Link href='/signup' className="text-primary hover:underline">Sign Up</Link>
            </p>
        </CardFooter>
    </Card>

  );
}
