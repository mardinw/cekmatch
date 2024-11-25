"use client"
import { Subscription } from "@/components/subscriptions";
import { useRouter } from "next/navigation";

export default function Subscriptions() {
  const router = useRouter();
  const isAccessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  // const isAuthorize = () => {
  //   if (isAccessToken) {
  //     router.push("/profile");
  //   } else {
  //     router.push("/signin");
  //   }
  // }

  // // cek kondisinya pakai useEffect
  // useEffect(() =>{
  //   isAuthorize();
  // })
  return (
    <Subscription/>
  )
}
