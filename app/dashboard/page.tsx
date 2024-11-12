import DataTableListFile from "./dataTableListFile";
import DataTablePreview from "./dataTablePreview";

export default async function Dashboard() {

    return (
      <>
    <div className=" text-center">
        <h1 className="text-2xl font-bold underline">Welcome to dashboard</h1>
    </div>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      <DataTableListFile />
      <DataTablePreview />
    </div>
    </>
  );
}
