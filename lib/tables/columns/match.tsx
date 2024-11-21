"use client"

import { MatchFile } from "@/dtos/matchFile"
import { ColumnDef } from "@tanstack/react-table"


export const columnsMatch: ColumnDef<MatchFile>[] = [
  {
    id: "no",
    header: "No",
    cell: ({row}) => {
      console.log(row.index);
      const column = row.index + 1;
      return column;
    },
  },
  {
    accessorKey: "nama_data",
    header: "Nama Data",
  },
  {
    accessorKey: "alamat_data",
    header: "Alamat Data",
  },
  {
    accessorKey: "kelurahan_data",
    header: "Kelurahan Data",
  },
  {
    accessorKey: "kecamatan_data",
    header: "Kecamatan Data",
  },
  {
    accessorKey: "nama",
    header: "Nama Match",
  },
  {
    accessorKey: "kelurahan",
    header: "Kelurahan Match",
  },
  {
    accessorKey: "kecamatan",
    header: "Kecamatan Match",
  },
]
