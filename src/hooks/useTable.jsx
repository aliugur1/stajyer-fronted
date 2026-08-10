import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export function useTable(  ) {

  const GetTable = ({ name,columns, data,globalFilter, onGlobalFilterChange }) => {
    
    const table = useMaterialReactTable({
      columns: columns || [],
      data: data || [],
       manualFiltering: true,
    onGlobalFilterChange,
      enableRowSelection: true,
      initialState: {
        pagination: { pageSize: 10, pageIndex: 0 },
      },
      muiPaginationProps: {
        rowsPerPageOptions: [5, 10, 15, 20],
      },
      state: {
      globalFilter,
    },
    
      layoutMode: "grid",
    });
    return (
      <div>
        <h3 className="font-bold text-slate-900 mb-6">{name}</h3>
        <MaterialReactTable table={table} />
      </div>
    )
    
  };
  return { GetTable };
}

export default useTable;
