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
    cell: ({row}) => {
      const preview = row.original;
      const isoDateString = preview.dob;

      const date = new Date(isoDateString);
      // mendapatkan tahun, bulan, dan tanggal
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // bulan dimulai dari array 0
    const day = date.getDate();

    // format ulang menjadi string
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      return formattedDate;
    }, 
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
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
