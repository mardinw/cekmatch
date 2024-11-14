import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PopupSelectRowUser from '@/components/popupSelectRowUser';
import { SquarePen } from 'lucide-react';



export default function RowActionsUsers({uuid}: UsersProps) {

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
            <PopupSelectRowUser/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={'green'}>Simpan</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
