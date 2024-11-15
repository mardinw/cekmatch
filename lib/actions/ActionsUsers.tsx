import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeEvent, useState } from 'react';



export default function ActionsUsers({uuid, name}: UsersProps) {
    const [selectField, setSelectedField ] = useState<string>('username');
    const [inputValue, setInputValue] = useState<string>('');
    const [roleValue, setRoleValue] = useState<string>('user'); // Untuk role
    const [statusValue, setStatusValue] = useState<string>('0'); // Untuk status (aktif atau tidak aktif)

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


    const handleSubmit = () => {
      // akses api disini
      console.log(`Updating ${selectField} for user ${uuid} to ${inputValue || roleValue} '${statusValue}'`);
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
