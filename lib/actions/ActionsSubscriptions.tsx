import { Button } from '@/components/ui/button';
import { UsersProps } from '@/dtos/interfaceUsers';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SquarePen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChangeEvent, useEffect, useState } from 'react';
import { authClient } from '../auth-client';
import { Input } from '@/components/ui/input';



export default function ActionsSubscriptions({uuid, name}: UsersProps) {
    const [selectField, setSelectedField ] = useState<string>('username');
    const [inputValue, setInputValue] = useState<number>(0);
    
    const accessToken = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    if (!accessToken || accessToken === 'undefined') {
        return null; // Kembali ke null jika token tidak ada atau tidak valid
    }

    useEffect(() => {
      const fetchData = async() => {
        try {
          const res = await fetch(`${authClient.baseURL}/v1/data/subscriptions/request?uuid=${uuid}`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (res.ok) {
            const data = await res.json();
            if(data.length > 0 && data[0].request_limit !== undefined) {
              setInputValue(data[0].request_limit);
              console.log(inputValue);
            }
          } else {
            console.error('Failed to fetch data from API');
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [uuid, accessToken]);

    const handleSelectChange = (value: string) => {
      setSelectedField(value);
      setInputValue(0);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    }


    const handleSubmit = async () => {
      const payload: Record<string, string|number|undefined> = {
        uuid,
        [selectField]: inputValue,
      };

      console.log(payload);

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
      console.log(`Updating ${selectField} for user ${uuid} to ${inputValue}'`);
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
                    <SelectItem value="request_limit">Request Limit</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          {selectField === 'request_limit' ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Request Limit
              </Label>
              <Input 
                id={inputValue}
                className="col-span-3" 
                type={'text'}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`Enter ${selectField}`}
                />
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
