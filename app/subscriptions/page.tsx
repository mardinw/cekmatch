"use client"
import { useRouter } from "next/navigation";
import DataTableListSubscriptions from "./dataTableListSubscriptions";

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
    <DataTableListSubscriptions/>
  )
}
