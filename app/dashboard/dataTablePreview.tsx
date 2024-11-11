"use client"
import { TableListFile } from "@/lib/tables/listfiles";
import { ListAllFile } from "@/dtos/listFIleAll";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { columnsPreview } from "@/lib/tables/columns/preview";

async function fetchData(): Promise<ListAllFile[] | null> {
  const baseUrl = authClient.baseURL;
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }

  try {
      const response = await fetch(`${baseUrl}/v1/data/all`, {
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

export default function DataTablePreview() {
    const router = useRouter();
    const [data, setData] = useState<ListAllFile[] | null>(null);

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
        <TableListFile  columns={columnsPreview} data={data}/>
      ) : (
        <p className="text-center">Fetch data ...</p>
      )}
    </>
  )
}