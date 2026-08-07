import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export function useTable() {
  const GetTable = ({ columns, data }) => {
    const table = useMaterialReactTable({
      columns: columns || [],
      data: data || [],
      enableRowSelection: true,
      initialState: {
        pagination: { pageSize: 5, pageIndex: 0 ,},
        
      },
      
      layoutMode: "grid",
    });
    return <MaterialReactTable table={table} />;
  };
  return { GetTable };
}

export default useTable;
