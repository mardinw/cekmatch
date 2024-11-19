"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { ChangeEvent, useState } from 'react'
import { authClient } from '../auth-client'
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation'
import { useSelection } from '../context/selection'

export default function DialogUpdatePassword () {

    const router = useRouter()
    const [inputValue, setInputValue] = useState<string>('');
    const {
      openDialogChangePassword,
      setOpenDialogChangePassword,
    } = useSelection();

    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    if (!accessToken || accessToken === 'undefined') {
        return null; // Kembali ke null jika token tidak ada atau tidak valid
    }


    const decoded = jwt.decode(accessToken);
    let uuid : string = ""; 
    if (decoded && typeof decoded === 'object' && 'role' in decoded) {
      uuid = decoded.uuid;
    } else {
      router.push('/signin');
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    }

    const handleClose = () => setOpenDialogChangePassword(false);

    const handleSubmit = async () => {

      // akses api disini
      try { 
        const res = await fetch(`${authClient.baseURL}/v1/data/user?uuid=${uuid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(
            {
              'password': inputValue
            }
          ),
        });

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
    }
    return (
    <Dialog open={openDialogChangePassword} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ubah Password Akun</DialogTitle>
          <DialogDescription>
            Untuk melakukan perubahan password disini. Pilih data yang akan diubah dan klik Simpan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pilihan" className="text-right">
              Ubah Password
            </Label>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input 
              id={inputValue}
              className="col-span-3" 
              type={'password'}
              value={inputValue}
              placeholder={`Isi password baru anda`} onChange={handleInputChange}
              />
          </div>       
          </div>
        </div>
        <DialogFooter>
        <Button onClick={handleSubmit} variant={'green'}>Simpan</Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}