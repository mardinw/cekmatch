"use client"

import { ListUsers } from "@/dtos/listUsers"
import DialogDeleteUser from "@/lib/actions/DialogDeleteUser"
import RowActionsUsers from "@/lib/actions/rowActionsUsers"
import { ColumnDef } from "@tanstack/react-table"

export const columnsListUsers: ColumnDef<ListUsers>[] = [
  {
    accessorKey: "name",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "is_active",
    header: "Status",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({row}) => {
      const users = row.original;
    return  (
      <div className="flex space-x-4">
        <RowActionsUsers uuid={users.uuid}/>
        <DialogDeleteUser uuid={users.uuid}/>
      </div>
    )
    }, 
  },
]
