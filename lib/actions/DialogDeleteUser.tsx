import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { OctagonX } from 'lucide-react';



export default function DialogDeleteUser({uuid}: UsersProps) {

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'red'}>
            <OctagonX className="h-6 w-6"/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Pengguna?</DialogTitle>
            <DialogDescription>
              Apakah anda akan menghapus data pengguna ini ?
            </DialogDescription>
          </DialogHeader>
        <DialogFooter>
          <Button variant={'red'}>Tidak</Button>
          <Button variant={'outline'} type='submit'>Ya</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
