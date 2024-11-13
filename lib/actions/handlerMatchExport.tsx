import { FileProps } from "@/dtos/interfaceFilename";
import { authClient } from "../auth-client";

export const HandlerMatchExport = async({fileName} : FileProps) => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }
  try{
    const res = await fetch(`${authClient.baseURL}/v1/data/match/export?file=${fileName}`, {
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
      a.download = `match_${Date.now()}.xlsx`;
      a.click();

      window.URL.revokeObjectURL(url);
    } else {
      console.error('Gagal mengekspor data', res.statusText);
    }
  } catch (e) {
    console.error('Error saat mengekspor data:', e);
  }
};