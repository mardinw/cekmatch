"use client"

import { ListAllFile } from "@/dtos/listFIleAll"
import RowActions from "@/lib/actions/rowActions"
import { ColumnDef } from "@tanstack/react-table"

export const columnsList: ColumnDef<ListAllFile>[] = [
  {
    accessorKey: "users",
    header: "User",
  },
  {
    accessorKey: "jumlah_data",
    header: "Jumlah Data",
  },
  {
    accessorKey: "nama_file",
    header: "Nama File",
  },
  {
    id: "actions",
    cell: ({row}) => {
      const file = row.original

    return  (
      <RowActions />
    )
    }, 
  },
]
