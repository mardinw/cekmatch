"use client"
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { ListSubscriptions } from "@/dtos/listSubscriptions";
import { TableListSubscriptions } from "@/lib/tables/listSubscriptions";
import { columnsListSubscriptions } from "@/lib/tables/columns/listSubscriptions";

const baseUrl = authClient.baseURL;

async function fetchData(): Promise<ListSubscriptions[] | null> {

  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }

  try {
      const response = await fetch(`${baseUrl}/v1/data/subscriptions`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });

      if (response.status === 200) {
          const data = await response.json();
          return data; // Mengembalikan data jika request berhasil
      } else {
          localStorage.removeItem('access_token'); // Hapus token jika tidak valid
          return null;
      }
  } catch (error) {
      console.error('Error validating token:', error);
      localStorage.removeItem('access_token');
      return null;
  }
}

export default function DataTableListSubscriptions() {
    const router = useRouter();
    const [data, setData] = useState<ListSubscriptions[] | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            if (data) {
                setData(data); // Set data jika token valid
            } else {
                router.push('/signin'); // Redirect jika token tidak valid
            }
        };

       getData();
    }, [router]);
  
  return (
    <>
      {data ? (
        <TableListSubscriptions  columns={columnsListSubscriptions} data={data}/>
      ): (
        <p className="text-center">loading...</p>
      )}
    </>
  )
}