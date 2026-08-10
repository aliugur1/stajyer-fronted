import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export function useTable() {
  const GetTable = ({
    name,
    columns,
    data,
    globalFilter,
    onGlobalFilterChange,
    pagination,
    onPaginationChange,
    sorting,
    onSortingChange,
    rowCount,
  }) => {
    const table = useMaterialReactTable({
      columns: columns || [],
      data: data || [],
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
      rowCount,
      enableColumnActions: false,
      onGlobalFilterChange,
      onPaginationChange,
      onSortingChange,
      initialState: {
        pagination: { pageSize: 10, pageIndex: 0 },
      },
      muiPaginationProps: {
        rowsPerPageOptions: [5, 10, 15, 20],
      },
      state: {
        globalFilter,
        pagination,
        sorting,
      },
      layoutMode: "grid",
    });
    return (
      <div>
        <h3 className="font-bold text-slate-900 mb-6">{name}</h3>
        <MaterialReactTable table={table} />
      </div>
    );
  };
  return { GetTable };
}

export default useTable;
