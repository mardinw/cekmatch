"use client"

import { MatchFile } from "@/dtos/matchFile"
import { ColumnDef } from "@tanstack/react-table"


export const columnsMatch: ColumnDef<MatchFile>[] = [
  {
    accessorKey: "nama_data",
    header: "Nama Data",
  },
  {
    accessorKey: "kecamatan_data",
    header: "Kecamatan",
  },
  {
    accessorKey: "kelurahan_data",
    header: "Kelurahan",
  },
  {
    accessorKey: "nama",
    header: "Nama Match",
  },
  {
    accessorKey: "kecamatan",
    header: "Kecamatan",
  },
  {
    accessorKey: "kelurahan",
    header: "Kelurahan",
  },
]
