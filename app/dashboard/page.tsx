"use client"
import DataTableListFile from "./dataTableListFile";
import DataTablePreview from "./dataTablePreview";
import DataTableMatch from "./dataTableMatch";
import { useSelection } from "@/lib/context/selection";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { HandleDownloadSample } from "@/lib/actions/handlerDownloadSample";


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

      const res = await fetch(`${authClient.baseURL}/v1/data/upload`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: data,
      });

      if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'An unknown error occured');
      }
      alert('Upload Successful!');
    } catch (error) {
      console.error(error);
      alert(`Upload failed: ${error}`);
    } finally {
      setIsUploading(false);
      window.location.reload();
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
            onClick={() => HandleDownloadSample()}
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
