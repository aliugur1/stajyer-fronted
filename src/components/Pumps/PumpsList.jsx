import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useTranslation } from "react-i18next";
import Labels from "../Labels";

const PumpsList = ({ data, globalFilter, onGlobalFilterChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate("");
  const TypeLabels= Labels();
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: t("PL1"), //BURAYA data.name yazmadık çünkü veriyi data olarak alıyoruz
        size: 100,
      },
      {
        accessorKey: "pumpNumber",
        header: t("PL2"),
        size: 100,
      },
      {
        accessorKey: "serialNumber", //normal accessorKey
        header: t("PL3"),
        size: 100,
      },
      {
        accessorKey: "fuelType",
        header: t("PL4"),
       Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
      },
      {
        accessorKey: "status",
        header: t("PL5"),
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
      },
      {
        accessorKey: "unitPrice",
        header: t("PL6"),
        size: 100,
      },
      {
        accessorKey: "dailyLiter",
        header: t("PL7"),
        size: 100,
      },
      {
        accessorKey: "dailyRevenue",
        header: t("PL8"),
        size: 100,
      },
      {
        accessorKey: "lastSaleAt",
        header: t("PL9"),
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString("tr-TR")
            : "-", // tarihi formatlıyor
        size: 100,
      },
    ],
    [t,TypeLabels],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    manualFiltering: true,
    onGlobalFilterChange,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15, 20],
    },
    state: {
      globalFilter,
    },

    // layoutMode: 'grid',//zorla size boyutunu girer
    muiTableBodyRowProps: ({ row }) => ({
      //data yerine row kullanmamız sebebi tabloda row kullanılması
      // Satırda herhangi bir yere tıklandığında tetiklenir
      onClick: () => {
        navigate(`/pumps/${row?.original?.id}`, { state: row?.original });
      },
      sx: { cursor: "pointer" },
    }),
  });
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-6">{t("PL9")}</h3>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default PumpsList;
