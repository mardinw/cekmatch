"use client"

import { ListAllFile } from "@/dtos/listFIleAll"
import RowActions from "@/lib/actions/rowActions"
import { ColumnDef } from "@tanstack/react-table"

export const columnsList: ColumnDef<ListAllFile>[] = [
  {
    accessorKey: "name",
    header: "Nama Pengguna",
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
    header: "Aksi",
    cell: ({row}) => {
      const file = row.original;
    return  (
      <RowActions fileName={file.nama_file}/>
    )
    }, 
  },
]
