"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListAllFile } from "@/dtos/listFIleAll"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"


export const columns: ColumnDef<ListAllFile>[] = [
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
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Read Data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Match Data</DropdownMenuItem>
            <DropdownMenuItem>Export Match</DropdownMenuItem>
            <DropdownMenuItem>Delete Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
