import { FileProps } from "@/dtos/interfaceFilename";
import { authClient } from "../auth-client";

export const HandlerDelete = async ({fileName}: FileProps) => {

    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;

    if (!accessToken || accessToken === 'undefined') {
        return null; // Kembali ke null jika token tidak ada atau tidak valid
    }
    try {
        const res = await fetch(`${authClient.baseURL}/v1/data/files?file=${fileName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });   
    
        if(res.ok) {
            console.log('File deleted successfully');
        } else {
            console.log('failed to delete file');
        }

    } catch(e) {
        console.error('Error fetching data:', e);
    } finally {
        window.location.reload();
    }
}

