"use client"

import { MatchFile } from "@/dtos/matchFile"
import { ColumnDef } from "@tanstack/react-table"


export const columnsMatch: ColumnDef<MatchFile>[] = [
  {
    accessorKey: "nama_data",
    header: "Nama Data",
  },
  {
    accessorKey: "alamat_data",
    header: "Alamat Data",
  },
  {
    accessorKey: "kecamatan_data",
    header: "Kecamatan Data",
  },
  {
    accessorKey: "kelurahan_data",
    header: "Kelurahan Data",
  },
  {
    accessorKey: "nama",
    header: "Nama Match",
  },
  {
    accessorKey: "kecamatan",
    header: "Kecamatan Match",
  },
  {
    accessorKey: "kelurahan",
    header: "Kelurahan Match",
  },
]
