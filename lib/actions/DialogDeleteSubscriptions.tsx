import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { OctagonX } from 'lucide-react';
import { authClient } from '../auth-client';
import { FormEventHandler, useState } from 'react';



export default function DialogDeleteSubscriptions({uuid, name}: UsersProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    if (!accessToken || accessToken === 'undefined') {
        return null; // Kembali ke null jika token tidak ada atau tidak valid
    }
  
    const handleDeleteUser: FormEventHandler<HTMLButtonElement> = (event) => {
      event.preventDefault();
      const result = asyncDeleteUser(uuid);
      return result;
    }

    const asyncDeleteUser = async(uuid: string) => {
      try { 
      const res = await fetch(`${authClient.baseURL}/v1/data/subscriptions=${uuid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if(res.ok) {
        console.log('File deleted successfully');
      } 

    } catch (e) {
      console.log('Error deleting data:', e);
    } finally {
      window.location.reload();
    }
    }

    return (
      <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={'red'} onClick={() => setIsDialogOpen(true)}>
            <OctagonX className="h-6 w-6"/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Akun {name.toUpperCase()}?</DialogTitle>
            <DialogDescription>
              Apakah anda akan menghapus data pengguna ini ?
            </DialogDescription>
          </DialogHeader>
        <DialogFooter>
          <Button variant={'red'} onClick={() => setIsDialogOpen(false)}>Tidak</Button>
          <Button variant={'outline'} onClick={handleDeleteUser}>Ya</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    )
}
