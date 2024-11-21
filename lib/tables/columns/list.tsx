"use client"

import { ListAllFile } from "@/dtos/listFIleAll"
import RowActions from "@/lib/actions/rowActions"
import { ColumnDef } from "@tanstack/react-table"

export const columnsList: ColumnDef<ListAllFile>[] = [
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
