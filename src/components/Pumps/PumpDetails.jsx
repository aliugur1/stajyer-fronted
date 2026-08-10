import { useLocation, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useEffect, useState, useMemo } from "react";
import { api } from "../../api/ApiKey";
import ModalFault from "../Modal/ModalFault";
import SummaryCard from "../SummaryCard";
import { useTable } from "../../hooks/useTable";
import ModalLoading from "../Modal/ModalLoading";
import { useTranslation } from "react-i18next";
import Labels from "../Labels";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";
export default function PumpDetails() {
  const { t } = useTranslation();
  const { id } = useParams(); //burada navigate aktardıgımız id yakalıyoruz
  const [statisticsData, setStatisticsData] = useState("");
  // const [recentSalesData, setRecentSalesData] = useState("");
  const [fuelSummaryData, setFuelSummaryData] = useState("");
  const [maintenanceData, setMaintenanceData] = useState("");
  const [salesData, setSalesData] = useState("");
  const TypeLabels = Labels();
  const [globalFilter, setGlobalFilter] = useState("");
  useEffect(() => {
    const getSales = async () => {
      const search = globalFilter ? `&search=${globalFilter}` : "";
      const sales = await api(`/api/pumps/${id}/sales?${search}`);
      setSalesData(sales.data);
    };
    getSales();
  }, [id, globalFilter]);
  useEffect(() => {
    const getAllData = async () => {
      const data = await api(`/api/pumps/${id}`); //burada ip de statics gidiyoruz
      const sales = await api(`/api/pumps/${id}/sales`);
      setStatisticsData(data.data.statistics); // bunu pumps ta yakalayabilirdim ama ben ilk başta statistics  kendim yaz
      // setRecentSalesData(data.data.recentSales);
      setFuelSummaryData(data.data.fuelSummary);
      setMaintenanceData(data.data.maintenance);
      setSalesData(sales.data);
    }; //şimdi bir daha kodu değiştirme hem objeyi asagıdaki şekilde getirebiliriz
    getAllData();
  }, [id]);
  const { GetTable } = useTable();
  const location = useLocation();
  const pump = location.state; //objeyi burada yakalıyoruz
  const [isFaultModalOpen, setIsFaultModalOpen] = useState(false);
  // console.log(recentSalesData);
  const summaryPumpT = {
    name: t("PSP1"),
    icon: " ",
    card: [
      {
        title: t("PSP2"),
        price: statisticsData?.today?.salesCount,
      },
      {
        title: t("PSP3"),
        price: statisticsData?.today?.totalLiter,
      },

      {
        title: t("PSP4"),
        price: statisticsData?.today?.revenue,
      },
    ],
  };
  const summaryPump7 = {
    name: t("PSP71"),
    icon: " ",
    card: [
      {
        title: t("PSP72"),
        price: statisticsData?.last7Days?.salesCount,
      },
      {
        title: t("PSP73"),
        price: statisticsData?.last7Days?.totalLiter,
      },

      {
        title: t("PSP74"),
        price: statisticsData?.last7Days?.revenue,
      },
    ],
  };
  const summaryPump30 = {
    name: t("PSP31"),
    icon: " ",
    card: [
      {
        title: t("PSP32"),
        price: statisticsData?.last30Days?.salesCount,
      },
      {
        title: t("PSP33"),
        price: statisticsData?.last30Days?.totalLiter,
      },

      {
        title: t("PSP34"),
        price: statisticsData?.last30Days?.revenue,
      },
    ],
  };
  const summaryFuel = {
    name: t("PSF1"),
    icon: " ",
    card: [
      {
        title: t("PSF2"),
        price:
          TypeLabels[fuelSummaryData[0]?.fuelType] ||
          fuelSummaryData[0]?.fuelType,
      },
      {
        title: t("PSF3"),
        price: fuelSummaryData[0]?.salesCount,
      },

      {
        title: t("PSF4"),
        price: fuelSummaryData[0]?.totalLiter?.toFixed(2),
      },
      {
        title: t("PSF5"),
        price: fuelSummaryData[0]?.revenue?.toFixed(2),
      },
    ],
  };
  const summaryMaintenance = {
    name: t("PSM1"),
    icon: " ",
    card: [
      {
        title: t("PSM2"),
        price: maintenanceData?.faultCode || "Ariza kodu bulunmuyor",
      },
      {
        title: t("PSM3"),
        price: maintenanceData?.faultMessage ?? "Ariza mesaj bulunmuyor",
      },

      {
        title: t("PSM4"),
        price:
          maintenanceData?.lastMaintenanceAt &&
          new Date(maintenanceData.lastMaintenanceAt).toLocaleString("tr-TR"),
      },
      {
        title: t("PSM5"),
        price:
          maintenanceData?.nextMaintenanceAt &&
          new Date(maintenanceData.nextMaintenanceAt).toLocaleString("tr-TR"),
      },
    ],
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "attendantName", //bunu pump list ten aldım buna ayrı bir hook kurup her seferinde bunları yazmayız onu zamanla ogrene,cem
        header: t("PT1"),
        size: 100,
      },
      {
        accessorKey: "unitPrice",
        header: t("PT2"),
        size: 100,
      },
      {
        accessorKey: "liter",
        header: t("PT3"),
        size: 100,
      },
      {
        accessorKey: "totalAmount",
        header: t("PT4"),
        size: 100,
      },
      {
        accessorKey: "fuelType",
        header: t("PT5"),
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
      },
      {
        accessorKey: "paymentType",
        header: t("PT6"),
        Cell: ({ cell }) => TypeLabels[cell.getValue()] ?? "-",
        size: 100,
      },
      {
        accessorKey: "plateNumber",
        header: t("PT7"),
        size: 100,
      },
      {
        accessorKey: "createdAt",
        header: t("PT8"),
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString("tr-TR")
            : "-",
        size: 100,
      },
    ],
    [t, TypeLabels],
  );
  // const table = useMaterialReactTable({
  //   columns,
  //   data: salesData ?? [],
  //   initialState: {
  //     pagination: { pageSize: 4, pageIndex: 0 }, // İlk açılışta sadece 5 satır gösterir
  //   },
  //   layoutMode: "grid", //zorla size boyutunu girer
  //   sorting: [
  //     {
  //       id: "createdAt", // VEYA tarihe göre sırala ya cak sanız kolonun accessorKey adını yazın: 'date'
  //       desc: true, // true yaparak en büyük ID/en yeni tarihi en üste getiririz
  //     },
  //   ],
  // });
  if (!pump) {
    return (
      <div>
        <ModalLoading />{" "}
      </div>
    );
  }
  return (
    <div className="md:pl-16">
      <Navbar />
      <div>
        <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">
              {pump?.name || t("PD1")}
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-500">
              {pump?.brand}
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-500">
              {pump?.model}
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-300 text-sm text-gray-500">
              {pump?.createdAt
                ? new Date(pump.createdAt).toLocaleString("tr-TR")
                : "-"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFaultModalOpen(true)}
              className="text-white bg-red-500 hover:bg-red-700 border border-transparent focus:ring-4 focus:ring-red-200 font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
              type="button"
            >
              {" "}
              {t("PD2")}
            </button>
          </div>
        </div>
      </div>
      <div>
        {/*kartları*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <SummaryCard data={summaryPumpT} />
          <SummaryCard data={summaryPump7} />
          <SummaryCard data={summaryPump30} />
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-slate-900 mb-6">{t("PD3")} </h3>
        {/* <MaterialReactTable table={table} /> */}
        <GetTable
          columns={columns}
          data={salesData ?? []}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
        />
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <SummaryCard data={summaryFuel} />
          <SummaryCard data={summaryMaintenance} />
        </div>
      </div>
      <ModalFault
        pump={pump.id}
        isModalOpen={isFaultModalOpen}
        onClose={() => setIsFaultModalOpen(false)}
      />
    </div>
  );
}
