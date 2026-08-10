import { useEffect, useState } from "react";
import { api } from "../api/ApiKey";
import BarsChart from "../components/chart/barsChart";
import PieChart from "../components/chart/pieChart";
import tableChart from "../components/chart/tableChart";
import ComplexNavbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { UsersIcon, StarIcon } from "@heroicons/react/24/solid";
import ModalLoading from "../components/Modal/ModalLoading";
import { useTranslation } from "react-i18next";
import Labels from "../components/Labels";
import ModalError from "../components/Modal/ModalError";

export default function Dashboard() {
  const { t } = useTranslation();
  const TypeLabels = Labels();
  const [dashboardData, setDashboardData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api("/api/dashboard?period=30d");
        setDashboardData(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllData(); // burada key gidip token ve korumalı sayfayı kontrol ediyor
  }, []);
  const recentChartData = tableChart({
    rows01: dashboardData?.data?.recentActivities,
    rows02: dashboardData?.data?.recentSales,
  });
  const summaryDashboardPumps = {
    name: t("DSP1"),
    icon: "fa-solid fa-gas-pump",
    card: [
      {
        title: t("DSP2"),
        price: dashboardData?.data?.summary?.totalPumps,
      },
      {
        title: t("DSP3"),
        price: dashboardData?.data?.summary?.activePumps,
      },
      {
        title: t("DSP4"),
        price: dashboardData?.data?.summary?.passivePumps,
      },
      {
        title: t("DSP5"),
        price: dashboardData?.data?.summary?.faultyPumps,
      },
      {
        title: t("DSP6"),
        price: dashboardData?.data?.summary?.maintenancePumps,
      },
    ],
  };
  const summaryDashboardCustomers = {
    name: t("DSC1"),
    icon: UsersIcon,
    card: [
      {
        title: t("DSC2"),
        price: dashboardData?.data?.summary?.totalCustomers,
      },
      {
        title: t("DSC7"),
        price: dashboardData?.data?.summary?.activeCustomers,
      },
      {
        title: t("DSC3"),
        price: dashboardData?.data?.summary?.todaySalesCount,
      },
      {
        title: t("DSC4"),
        price: dashboardData?.data?.summary?.todayTotalLiter,
      },
      {
        title: t("DSC5"),
        price: dashboardData?.data?.summary?.todayRevenue,
      },
      {
        title: t("DSC6"),
        price: dashboardData?.data?.summary?.monthlyRevenue,
      },
    ],
  };
  const summaryDashboardTopPump = {
    name: t("DST1"),
    icon: StarIcon,
    card: [
      {
        title: t("DST5"),
        price:
          TypeLabels[dashboardData?.data?.topPumps[0]?.fuelType] ||
          dashboardData?.data?.topPumps[0]?.fuelType,
      },
      {
        title: t("DST2"),
        price: dashboardData?.data?.topPumps[0]?.name,
      },
      {
        title: t("DST3"),
        price: dashboardData?.data?.topPumps[0]?.revenue,
      },
      {
        title: t("DST4"),
        price: dashboardData?.data?.topPumps[0]?.totalLiter,
      },
    ],
  };
  return (
    <div className="md:pl-16">
      <ModalError
        isModalOpen={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <ModalLoading isModalOpen={loading} />
      <ComplexNavbar />
      <div>
        {/*summary kartları*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <SummaryCard data={summaryDashboardPumps} />
          <SummaryCard data={summaryDashboardCustomers} />
          <SummaryCard data={summaryDashboardTopPump} />
        </div>
      </div>
      <div>
        {/* burası select chart  burası bar grafiği olacak*/}
        <div style={{ flex: 1, minWidth: 0 }}>
          <BarsChart data={dashboardData?.data?.salesChart} />
        </div>
        {/* burası pasta grafiği olacak içinde fuelDistribution ve pumpStatusDistribution*/}
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-6">
          <div style={{ flex: 1, minWidth: 0 }}>
            <PieChart
              name={t("pieChart.name")}
              data={dashboardData?.data?.fuelDistribution?.map((d) => ({
                label: TypeLabels[d?.fuelType] || d?.fuelType,
                value: d.percentage,
              }))}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <PieChart
              data={dashboardData?.data?.pumpStatusDistribution?.map((d) => ({
                label: TypeLabels[d?.status] || d?.status,
                value: d.count,
              }))}
              name={t("pieChart.name1")}
            />
          </div>
        </div>
      </div>
      <div>
        {/* tabloda recentSales / recentActivities kullanılmalıdır.*/}
        {recentChartData}
      </div>
    </div>
  );
}
