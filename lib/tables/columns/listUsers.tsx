"use client"

import { ListUsers } from "@/dtos/listUsers"
import DialogDeleteUser from "@/lib/actions/DialogDeleteUser"
import { ColumnDef } from "@tanstack/react-table"
import ActionsUsers from "@/lib/actions/ActionsUsers"

export const columnsListUsers: ColumnDef<ListUsers>[] = [
  {
    id: "no",
    header: "No",
    cell: ({row}) => {
      const column = row.index + 1;
      return column;
    },
  },
  {
    accessorKey: "name",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Hak Akses",
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({row}) => {
      const status = row.original;
      return status.is_active === 1 ? 'Aktif': 'Tidak Aktif'
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({row}) => {
      const users = row.original;
    return  (
      <div className="flex space-x-4">
        <ActionsUsers uuid={users.uuid} name={users.name}/>
        <DialogDeleteUser uuid={users.uuid} name={users.name}/>
      </div>
    )
    }, 
  },
]
