"use client"
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { columnsMatch } from "@/lib/tables/columns/match";
import { TableMatchFile } from "@/lib/tables/matchfile";
import { MatchFile } from "@/dtos/matchFile";
import { useSelection } from "@/lib/context/selection";
import { Button } from "@/components/ui/button";

interface fetchDataProps {
  fileName: string
}
const baseUrl = authClient.baseURL;

async function fetchData({fileName}: fetchDataProps): Promise<MatchFile[] | null> {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }

  try {
      const response = await fetch(`${baseUrl}/v1/data/match?file=${fileName}`, {
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

async function handleMatchExport({fileName} : fetchDataProps) {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }
  try{
    const res = await fetch(`${baseUrl}/v1/data/match/export?file=${fileName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if(res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();

      window.URL.revokeObjectURL(url);
    } else {
      console.error('Gagal mengekspor data', res.statusText);
    }
  } catch (e) {
    console.error('Error saat mengekspor data:', e);
  }
};

export default function DataTableMatch() {
    const router = useRouter();
    const [data, setData] = useState<MatchFile[] | null>(null);
    const {selectedMatch} = useSelection();
    
    useEffect(() => {
        const getData = async () => {
          if(selectedMatch) {
            const data = await fetchData({fileName: selectedMatch});
            if (data) {
                setData(data); // Set data jika token valid
            } else {
                router.push('/signin'); // Redirect jika token tidak valid
            }
          }
        };

       getData();
    }, [router]);

    const handleExport = () => {
      if(selectedMatch) {
        handleMatchExport({fileName: selectedMatch})
      }
    }

  return (
    <>
      <div className="flex items-center justify-end py-4">
        <Button className="sm" onClick={handleExport}>Export</Button>
      </div>
      {data && <TableMatchFile  columns={columnsMatch} data={data}/>}
    </>
  )
}