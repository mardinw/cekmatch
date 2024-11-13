import { authClient } from "../auth-client";

export const HandleDownloadSample = async () => {
  const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
  const sampleFile = 'sample.xlsx'
  if (!accessToken || accessToken === 'undefined') {
      return null; // Kembali ke null jika token tidak ada atau tidak valid
  }
  try{
    const res = await fetch(`${authClient.baseURL}/v1/data/sample`, {
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