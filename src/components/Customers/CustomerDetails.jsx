import { useState, useEffect, useMemo } from "react";
import { api } from "../../api/ApiKey";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useTable } from "../../hooks/useTable";
import ModalDelete from "../Modal/ModalDelete";
import { usePatch } from "../../hooks/usePatch";
import SummaryCard from "../SummaryCard";
import ModalLoading from "../Modal/ModalLoading";
import ModalError from "../Modal/ModalError";
import { useTranslation } from "react-i18next";
import Labels from "../Labels";

export default function CustomerDetails() {
  const { t } = useTranslation();
  const TypeLabels = Labels();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [customersDetailData, setCustomersDetailData] = useState("");
  const [isFaultModalOpen, setIsFaultModalOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getSales = async () => {
      setLoading(true);
      setError("");
      try {
        const search = globalFilter ? `&search=${globalFilter}` : "";
        const page = `&page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`;
        const sort = sorting[0]
          ? `&sortBy=${sorting[0].id}&sortOrder=${sorting[0].desc ? "desc" : "asc"}`
          : "";
        const detail = await api(`/api/customers/${id}/sales?${page}${search}${sort}`);
        setSalesData(detail.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getSales();
  }, [id, globalFilter,pagination,sorting]);
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api(`/api/customers/${id}`); //burada ip de statics gidiyoruz
        setCustomersDetailData(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }; //şimdi bir daha kodu değiştirme hem objeyi asagıdaki şekilde getirebiliriz
    getAllData();
  }, [id]);
  //   const location = useLocation();
  //   const customer = location.state; //objeyi burada yakalıyoruz
  const customer = customersDetailData?.data?.customer;
  const payment = customersDetailData?.data?.paymentDistribution;
  const fuelDistribution = customersDetailData?.data?.fuelDistribution;
  const monthlyChart = customersDetailData?.data?.monthlyChart;
  const recentSales = salesData;
  // console.log(customersDetailData); // burada tüm data yı yakıyoruz
  //console.log(customer); //burada data içindeki data yı yakalıyoruz müşteri bilgileri
  const { GetTable } = useTable();
  const { PatchData } = usePatch();
  const fuelDistributionColumns = useMemo(
    () => [
      {
        accessorKey: "fuelType", //access nested data with dot notation
        header: t("customer.FDB1"),
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-", //BURAYA data.name yazmadık çünkü veriyi data olarak alıyoruz
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "count",
        header: t("customer.FDB2"),
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "totalLiter",
        header: t("customer.FDB3"),
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "totalAmount",
        header: t("customer.FDB4"),
        size: 100,
        enableSorting: false,
      },
    ],
    [t, TypeLabels],
  );
  const monthlyChartColumns = useMemo(
    () => [
      {
        accessorKey: "label", //access nested data with dot notation
        header: t("customer.MCC1"), //BURAYA data.name yazmadık çünkü veriyi data olarak alıyoruz
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "salesCount",
        header: t("customer.MCC2"),
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "totalLiter",
        header: t("customer.MCC3"),
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "totalAmount",
        header: t("customer.MCC4"),
        size: 100,
        enableSorting: false,
      },
    ],
    [t],
  );
  const recentSalesColumns = useMemo(
    () => [
      {
        accessorKey: "attendantName",
        header: t("customer.RSC1"),
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "plateNumber",
        header: t("customer.RSC2"),
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "fuelType", //access nested data with dot notation
        header: t("customer.RSC3"), //BURAYA data.name yazmadık çünkü veriyi data olarak alıyoruz
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "unitPrice",
        header: t("customer.RSC4"),
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "liter",
        header: t("customer.RSC5"),
        size: 100,
      },
      {
        accessorKey: "totalAmount",
        header: t("customer.RSC6"),
        size: 100,
      },
      {
        accessorKey: "receiptNumber",
        header: t("customer.RSC7"),
        size: 100,
        enableSorting: false,
      },
    ],
    [t, TypeLabels],
  );
  const summaryCustomer1 = {
    name: t("customer.SC11"),
    icon: " ",
    card: [
      {
        title: t("customer.SC12"),
        price: customer?.email,
      },
      {
        title: t("customer.SC13"),
        price: customer?.phone,
      },
      {
        title: t("customer.SC14"),
        price: customer?.plateNumber,
      },
      {
        title: t("customer.SC15"),
        price: customer?.city,
      },
      {
        title: t("customer.SC16"),
        price: customer?.district,
      },
      {
        title: t("customer.SC17"),
        price: customer?.address,
      },
    ],
  };
  const summaryCustomer2 = {
    name: t("customer.SC21"),
    icon: " ",
    card: [
      {
        title: t("customer.SC22"),
        price: TypeLabels[customer?.customerType] || customer?.customerType, //customer?.customerType,
      },
      {
        title: t("customerList4"),
        price: TypeLabels[customer?.loyaltyLevel] || customer?.loyaltyLevel,
      },
      {
        title: t("customerList8"),
        price: TypeLabels[customer?.status] || customer?.status,
      },
      {
        title: t("customer.SC25"),
        price: customer?.companyName,
      },
      {
        title: t("customer.SC26"),
        price: customer?.taxNumber,
      },
      {
        title: t("customer.SC27"),
        price: customer?.taxOffice,
      },
    ],
  };
  const summaryCustomer3 = {
    name: t("customer.SC31"),
    icon: " ",
    card: [
      {
        title: t("customer.SC32"),
        price: customer?.purchaseCount,
      },
      {
        title: t("customer.SC33"),
        price: customer?.totalLiter,
      },
      {
        title: t("customer.SC34"),
        price: customer?.totalPurchase,
      },
      {
        title: t("customer.SC35"),
        price:
          customer?.lastPurchaseAt &&
          new Date(customer?.lastPurchaseAt).toLocaleString("tr-TR"),
      },
      {
        title: t("customer.SC36"),
        price:
          customer?.updateAt &&
          new Date(customer?.updateAt).toLocaleString("tr-TR"),
      },

      {
        title: t("customer.SC37"),
        price:
          customer?.createdAt &&
          new Date(customer?.createdAt).toLocaleString("tr-TR"),
      },
    ],
  };
  const summaryPayment0 = {
    name: t("customer.SP01"),
    icon: " ",
    card: [
      {
        title: t("customer.SP03"),
        price: payment?.[0]?.count,
      },
      {
        title: t("customer.SP04"),
        price: payment?.[0]?.totalLiter,
      },
      {
        title: t("customer.SP05"),
        price: payment?.[0]?.totalAmount,
      },
    ],
  };
  const summaryPayment1 = {
    name: t("FT12"),
    icon: " ",
    card: [
      {
        title: t("customer.SP13"),
        price: payment?.[1]?.count,
      },
      {
        title: t("customer.SP14"),
        price: payment?.[1]?.totalLiter,
      },
      {
        title: t("customer.SP15"),
        price: payment?.[1]?.totalAmount,
      },
    ],
  };
  const summaryPayment2 = {
    name: t("FT10"),
    icon: " ",
    card: [
      {
        title: t("customer.SP03"),
        price: payment?.[2]?.count,
      },
      {
        title: t("customer.SP04"),
        price: payment?.[2]?.totalLiter,
      },
      {
        title: t("customer.SP05"),
        price: payment?.[2]?.totalAmount,
      },
    ],
  };
  const summaryPayment3 = {
    name: t("FT11"),
    icon: " ",
    card: [
      {
        title: t("customer.SP03"),
        price: payment?.[3]?.count,
      },
      {
        title: t("customer.SP04"),
        price: payment?.[3]?.totalLiter,
      },
      {
        title: t("customer.SP05"),
        price: payment?.[3]?.totalAmount,
      },
    ],
  };
  const original = location.state;
  const showSignUp = async () => {
    await navigate(`/customers/${id}/current`, { state: original });
    //navigate(`/pumps/${row?.original?.id}`, { state: row?.original });
  };
  const changeStatus = async () => {
    const newStatus = customer.status === "ACTIVE" ? "PASSIVE" : "ACTIVE";
    await PatchData("customers", id, "/status", { status: newStatus });
    window.location.reload(); // güncel veriyi çekmek için bunu yazdım getAllData yı burada kullanamayız çünkü use effect içinde ona özgü kısa yoldan pencereyi render ettik
  };
  return (
    <div className="md:pl-16">
      <ModalError
        isModalOpen={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <ModalLoading isModalOpen={loading} />
      <Navbar />
      <div>
        <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl font-bold text-gray-900">
              {customer?.firstName || t("customer.eksik")}
            </span>
            <span className="text-xl font-bold text-gray-900">
              {customer?.lastName}
            </span>
            <span
              className={`px-3 py-1 rounded-full border border-gray-300 text-sm text-white ${customer?.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}
            >
              {customer?.status === "ACTIVE"
                ? t("customer.aktif")
                : t("customer.pasif")}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsFaultModalOpen(true)}
              className="text-white bg-red-500 hover:bg-red-800 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
            >
              {t("customer.sil")}
            </button>
            <button
              onClick={showSignUp}
              className="text-white bg-blue-500 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
            >
              {t("customer.güncelle")}
            </button>
            <button
              onClick={changeStatus}
              className="text-white bg-blue-800 hover:bg-blue-950 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
            >
              {t("customer.changes")}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/*kartları*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <SummaryCard data={summaryCustomer1} />
          <SummaryCard data={summaryCustomer2} />
          <SummaryCard data={summaryCustomer3} />
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-slate-900 mb-6">
          {t("customer.payment")}{" "}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <SummaryCard data={summaryPayment0} />
          <SummaryCard data={summaryPayment1} />
          <SummaryCard data={summaryPayment2} />
          <SummaryCard data={summaryPayment3} />
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* <MaterialReactTable table={GetTable(recentSalesColumns,recentSales)} />; */}
        <GetTable
          name={t("customer.purchase")}
          columns={recentSalesColumns}
          data={recentSales}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
           pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <GetTable
            name={t("customer.dist")}
            columns={fuelDistributionColumns}
            data={fuelDistribution}
            globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
           pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          />
          <GetTable
            name={t("customer.dist2")}
            columns={monthlyChartColumns}
            data={monthlyChart}
            globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
           pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          />
        </div>
        <ModalDelete
          isModalOpen={isFaultModalOpen}
          onClose={() => setIsFaultModalOpen(false)}
          id={id}
        />
      </div>
    </div>
  );
}
