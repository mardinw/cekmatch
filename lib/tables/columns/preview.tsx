"use client"

import { ListAllFile } from "@/dtos/listFIleAll"
import { ColumnDef } from "@tanstack/react-table"


export const columnsPreview: ColumnDef<ListAllFile>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "dob",
    header: "Tanggal Lahir",
  },
  {
    accessorKey: "kecamatan",
    header: "Kecamatan",
  },
  {
    accessorKey: "kelurahan",
    header: "Kelurahan",
  },
  {
    accessorKey: "file",
    header: "Nama File",
  },
]
