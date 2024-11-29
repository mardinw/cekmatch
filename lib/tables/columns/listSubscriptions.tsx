"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ListSubscriptions } from "@/dtos/listSubscriptions"
import ActionsSubscriptions from "@/lib/actions/ActionsSubscriptions"
import DialogDeleteSubscriptions from "@/lib/actions/DialogDeleteSubscriptions"

export const columnsListSubscriptions: ColumnDef<ListSubscriptions>[] = [
  {
    id: "no",
    header: "No",
    cell: ({row}) => {
      const column = row.index + 1;
      return column;
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({row}) => {
    const preview = row.original;
    const isoDateString = preview.created_at;

    const date = new Date(isoDateString * 1000);
    // mendapatkan tahun, bulan, dan tanggal
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // bulan dimulai dari array 0
    const day = date.getDate();

    // format ulang menjadi string
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`
      return formattedDate;
    }, 
  },
  {
    accessorKey: "name",
    header: "Username",
  },
  {
    accessorKey: "limit_active",
    header: "Limit Active",
  },
  {
    accessorKey: "request_limit",
    header: "Request Limit",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({row}) => {
      const users = row.original;
      return  (
        <div className="flex space-x-4">
          <ActionsSubscriptions uuid={users.uuid} name={users.name}/>
          <DialogDeleteSubscriptions uuid={users.uuid} name={users.name}/>
        </div>
      )
    }, 
  },
]
