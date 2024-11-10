import { TableListFile } from "@/lib/tables/listfiles";
import { columns } from "./columns";
import { ListAllFile } from "@/dtos/listFIleAll";

async function getData(): Promise<ListAllFile[]> {
    // Fetch data from your API here.
    return [
      {
        users: "728ed52f",
        jumlah_data: 100,
        nama_file: "m@example.com",
      },
      {
        users: "489e1d42",
        jumlah_data: 125,
        nama_file: "processing",
      },
      // ...
    ]
  }

export default async function DataTableMatch() {
  const data = await getData();
  
  return (
    <>
      <TableListFile  columns={columns} data={data}/>
    </>
  )
}