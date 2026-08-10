import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ModalLoading from "../Modal/ModalLoading";
import { useTranslation } from "react-i18next";
import Labels from "../Labels";

const CustomersList = ({ data, globalFilter, onGlobalFilterChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate("");
  const TypeLabels = Labels();
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: t("customerList1"), //BURAYA data.name yazmadık çünkü veriyi data olarak alıyoruz
        size: 100,
      },
      {
        accessorKey: "lastName",
        header: t("customerList2"),
        size: 100,
      },
      {
        accessorKey: "companyName",
        header: t("customerList3"),
        size: 100,
      },
      {
        accessorKey: "loyaltyLevel", //normal accessorKey
        header: t("customerList4"),
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
      },
      {
        accessorKey: "email", //normal accessorKey
        header: t("customerList5"),
        size: 100,
      },
      {
        accessorKey: "phone",
        header: t("customerList6"),
        size: 100,
      },
      {
        accessorKey: "plateNumber",
        header: t("customerList7"),
        size: 100,
      },
      {
        accessorKey: "status",
        header: t("customerList8"),
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
      },
      {
        accessorKey: "customerType",
        header: t("customerList9"),
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
      },
      {
        accessorKey: "totalLiter",
        header: t("customerList10"),
        size: 100,
      },
      {
        accessorKey: "purchaseCount",
        header: t("customerList11"),
        size: 100,
      },
      {
        accessorKey: "totalPurchase",
        header: t("customerList12"),
        size: 100,
      },
      {
        accessorKey: "lastPurchaseAt",
        header: t("customerList13"),
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString("tr-TR")
            : "-",
        size: 100,
      },
      {
        accessorKey: "notes",
        header: t("customerList14"),
        size: 100,
      },
      {
        accessorKey: "updateAt",
        header: t("customerList15"),
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString("tr-TR")
            : "-",
        size: 100,
      },
      {
        accessorKey: "createdAt",
        header: t("customerList16"),
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString("tr-TR")
            : "-",
        size: 100,
      },
      {
        accessorKey: "address",
        header: t("customerList17"),
        size: 100,
      },
      {
        accessorKey: "city",
        header: t("customerList18"),
        size: 100,
      },
      {
        accessorKey: "district",
        header: t("customerList19"),
        size: 100,
      },
      {
        accessorKey: "taxNumber",
        header: t("customerList20"),
        size: 100,
      },
      {
        accessorKey: "taxOffice",
        header: t("customerList21"),
        size: 100,
      },
    ],
    [t, TypeLabels],
  );
  const table = useMaterialReactTable({
    columns,
    data,
    manualFiltering: true,
    onGlobalFilterChange,
    state: {
      globalFilter,
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate(`/customers/${row?.original?.id}`, { state: row?.original });
      },
      sx: { cursor: "pointer" },
    }),
  });
  function newCustomer(data) {
    return async () => {
      await navigate("/customers/newCustomer", {
        state: { customerType: data },
      });
    };
  }
  if (!data) {
    return (
      <div>
        <ModalLoading />{" "}
      </div>
    );
  }
  return (
    <>
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">
            {t("customerListName")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={newCustomer("INDIVIDUAL")}
            className="text-white bg-blue-600 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            {t("customerListButton1")}
          </button>
          {/* <button
            onClick={newCustomer("COMPANY")}
            className="text-white bg-blue-900 hover:bg-blue-950 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            {t("customerListButton2")}
          </button> */}
        </div>
      </div>
      <div>
        <MaterialReactTable table={table} />;
      </div>
    </>
  );
};

export default CustomersList;
