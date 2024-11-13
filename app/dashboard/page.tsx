"use client"
import DataTableListFile from "./dataTableListFile";
import DataTablePreview from "./dataTablePreview";
import DataTableMatch from "./dataTableMatch";
import { useSelection } from "@/lib/context/selection";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const baseUrl = authClient.baseURL;

const handleDownloadSample = async () => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
  const sampleFile = 'sample.xlsx'
  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }
  try{
    const res = await fetch(`${baseUrl}/v1/data/sample`, {
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
      a.download = sampleFile;
      a.click();

      window.URL.revokeObjectURL(url);
    } else {
      console.error('Gagal mendownload sample', res.statusText);
    }
  } catch (e) {
    console.error('Error saat mendownload sample data:', e);
  }
};

export default function Dashboard() {
  const { 
    selectedPreview,
    selectedMatch,
    file, setFile 
  } = useSelection();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  //const router = useRouter();
  const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    if (!accessToken || accessToken === 'undefined') {
        return null; // Kembali ke null jika token tidak ada atau tidak valid
    }

    event.preventDefault();

    if(!file) return
    try{
      setIsUploading(true);
      const data = new FormData();
      data.set('file', file);

      const res = await fetch(`${baseUrl}/v1/data/upload`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: data,
      });

      const result = await res.json();
      console.log(result);
      if(!res.ok) {
        if(res.status === 400) {
          console.log(`${res.statusText}`)
        } else {
          throw new Error(await res.text());
        }
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }

    return (
      <>
    <div className=" text-center">
        <h1 className="text-2xl font-bold underline">Welcome to dashboard</h1>
    </div>
    {/* Tambahkan tombol Download Sample dan Upload Data */}
    <form className="p-2" onSubmit={onSubmit}>
      <div className="mt-4 flex justify-center space-x-4">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleDownloadSample()}
          >
            Download Sample
          </button>

        <Input type="file" name="file" className="w-full max-w-xs" onChange={(e) => setFile(e.target.files?.[0])}/> 
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          type="submit"
          >
            {isUploading ? 'Upload...' : 'UPLOAD'}
          </button>
      </div>
    </form>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      <DataTableListFile />
      {selectedPreview && <DataTablePreview />}
      {selectedMatch && <DataTableMatch /> }
    </div>
    </>
  );
}
