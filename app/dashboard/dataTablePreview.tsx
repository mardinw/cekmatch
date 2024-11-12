"use client"
import { ListAllFile } from "@/dtos/listFIleAll";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { columnsPreview } from "@/lib/tables/columns/preview";
import { TablePreviewFile } from "@/lib/tables/previewfiles";
import { useSelection } from "@/lib/context/selection";

interface fetchDataProps {
  fileName: string
}
const baseUrl = authClient.baseURL;

async function fetchData({fileName}: fetchDataProps): Promise<ListAllFile[] | null> {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }

  try {
      const response = await fetch(`${baseUrl}/v1/data/read?file=${fileName}`, {
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
    const { selectedPreview} = useSelection();
    useEffect(() => {
        const getData = async () => {
          if(selectedPreview) {
            const data = await fetchData({fileName: selectedPreview});
            if (data) {
                setData(data); // Set data jika token valid
            } else {
                router.push('/signin'); // Redirect jika token tidak valid
            }
          }
        };

       getData();
    }, [router]);
  
  return (
    <>
      {data &&
        <TablePreviewFile  columns={columnsPreview} data={data}/>
      }
    </>
  )
}