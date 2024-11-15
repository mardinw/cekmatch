import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';



export default function ActionsUsers({uuid}: UsersProps) {

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'warning'}>
            <SquarePen className='h-6 w-6 bg-indigo-500'/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ubah Data Pengguna</DialogTitle>
            <DialogDescription>
              Perubahan data pengguna berada disini. Pilih data yang akan diubah dan klik Simpan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pilihan" className="text-right">
                Ubah Data
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Data</SelectLabel>
                    <SelectItem value="username">Username</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="role">Role</SelectItem>
                    <SelectItem value="is_active">Status</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={'green'}>Simpan</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
