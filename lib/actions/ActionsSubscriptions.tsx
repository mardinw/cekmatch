import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { authClient } from '../auth-client';



export default function ActionsSubscriptions({uuid, name}: UsersProps) {
    const [selectField, setSelectedField ] = useState<string>('username');
    const [inputValue, setInputValue] = useState<string>('');
    const [statusValue, setStatusValue] = useState<string>('0'); // Untuk status (aktif atau tidak aktif)
    
    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    if (!accessToken || accessToken === 'undefined') {
        return null; // Kembali ke null jika token tidak ada atau tidak valid
    }

    const handleSelectChange = (value: string) => {
      setSelectedField(value);
      setInputValue('');
    }

    const handleStatusChange = (value: string) => {
      setStatusValue(value);
    };


    const handleSubmit = async () => {
      const payload: Record<string, string|boolean|undefined> = {
        uuid,
      };

      console.log(payload);
      if (selectField === 'is_active') {
        if(statusValue === 'true') {
          payload.is_active = true;
        } else {
          payload.is_active = false;
        }
      }

      // akses api disini
      try { 
        const res = await fetch(`${authClient.baseURL}/v1/data/subscriptions`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        });
        console.log(payload)
        if(res.ok) {
          console.log('User update successfully');
        } else {
          const errData = await res.json();
          console.error('Failed to update user:', errData);
        }

      } catch (e) {
        console.log('Error updating user:', e);
      } finally {
        window.location.reload();
      }
      console.log(`Updating ${selectField} for user ${uuid} to ${inputValue || statusValue}'`);
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'warning'}>
            <SquarePen className='h-6 w-6 bg-indigo-500'/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ubah Data Subscriptions {name.toUpperCase()}</DialogTitle>
            <DialogDescription>
              Perubahan data langganan berada disini. Pilih data yang akan diubah dan klik Simpan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pilihan" className="text-right">
                Ubah Data
              </Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih data yang akan diubah"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Data</SelectLabel>
                    <SelectItem value="is_active">Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          {selectField === 'is_active' ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Aktivasi</SelectLabel>
                    <SelectItem value="false">Tidak Aktif</SelectItem>
                    <SelectItem value="true">Aktif</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} variant={'green'}>Simpan</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
