import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeEvent, useState } from 'react';
import { authClient } from '../auth-client';



export default function ActionsUsers({uuid, name}: UsersProps) {
    const [selectField, setSelectedField ] = useState<string>('username');
    const [inputValue, setInputValue] = useState<string>('');
    const [roleValue, setRoleValue] = useState<string>('user'); // Untuk role
    const [statusValue, setStatusValue] = useState<string>('0'); // Untuk status (aktif atau tidak aktif)
    
    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    if (!accessToken || accessToken === 'undefined') {
        return null; // Kembali ke null jika token tidak ada atau tidak valid
    }

    const handleSelectChange = (value: string) => {
      setSelectedField(value);
      setInputValue('');
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    }
    const handleRoleChange = (role: string) => {
      setRoleValue(role);
    };
    
    const handleStatusChange = (value: string) => {
      setStatusValue(value);
    };


    const handleSubmit = async () => {
      const payload: Record<string, string|number|undefined> = {};

      if (selectField === 'username') {
        payload.username = inputValue;
      } else if (selectField === 'password') {
        payload.password = inputValue;
      } else if (selectField === 'role') {
        payload.role = roleValue;
      } else if (selectField === 'is_active') {
        payload.is_active = parseInt(statusValue, 10);
      }

      // akses api disini
      try { 
        const res = await fetch(`${authClient.baseURL}/v1/data/user?uuid=${uuid}`, {
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
      console.log(`Updating ${selectField} for user ${uuid} to ${inputValue || roleValue || statusValue}'`);
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
            <DialogTitle>Ubah Data Akun {name.toUpperCase()}</DialogTitle>
            <DialogDescription>
              Perubahan data pengguna berada disini. Pilih data yang akan diubah dan klik Simpan.
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
                    <SelectItem value="username">Username</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="role">Hak Akses</SelectItem>
                    <SelectItem value="is_active">Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* conditional rendering berdasarkan pilihan */}
            {selectField === 'username' || selectField === 'password' ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={inputValue} className="text-right">
                {selectField === 'username' && 'Username'}
                {selectField === 'password' && 'Password'}
              </Label>
              <Input 
                id={inputValue}
                className="col-span-3" 
                type={selectField === 'password' ? 'password': 'text'}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`Enter ${selectField}`}
                />
          </div>) : null}

          {selectField === 'role' ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih role"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
          </div>) : null}

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
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="0">Tidak Aktif</SelectItem>
                    <SelectItem value="1">Aktif</SelectItem>
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
