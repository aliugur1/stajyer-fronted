import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ModalLoading from "../Modal/ModalLoading";
import { useTranslation } from "react-i18next";

const PumpsList = ({ data, globalFilter, onGlobalFilterChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate("");
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
        size: 100,
      },
      {
        accessorKey: "status",
        header: t("PL5"),
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
        size: 100,
      },
    ],
    [t],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    manualFiltering: true,
    onGlobalFilterChange,
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
  if (!data) {
    return (
      <div>
        <ModalLoading />{" "}
      </div>
    );
  }
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-6">{t("PL9")}</h3>
      <MaterialReactTable table={table} />;
    </div>
  );
};

export default PumpsList;
