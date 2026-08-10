import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/ApiKey";
import Navbar from "../components/Navbar";
import iconUser from "../assets/iconUsers.png";
import SummaryCard from "../components/SummaryCard";
import ModalExit from "../components/Modal/ModalExit";
import ModalLoading from "../components/Modal/ModalLoading";
import ModalError from "..//components/Modal/ModalError";
import { useTranslation } from "react-i18next";

export function Users() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userData, setUserData] = useState("");
  const [isFaultModalOpen, setIsFaultModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api("/api/users/profile");

        if (data?.data?.profileImageUrl == null) {
          setUserData({
            ...data,
            data: { ...data?.data, profileImageUrl: iconUser },
          });
        } else {
          setUserData(data);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, []);
  const user = userData.data;
  const showUser = async () => {
    await navigate(`/users/profile`);
  };
  const showPassword = async () => {
    await navigate(`/users/change`);
  };
  const summaryCard1 = {
    name: t("USC11"),
    icon: "fa-solid fa-user",
    card: [
      {
        title: t("USC12"),
        price: user?.firstName,
      },
      {
        title: t("USC13"),
        price: user?.lastName,
      },
      {
        title: t("USC14"),
        price: user?.role,
      },
      {
        title: t("USC15"),
        price: user?.phone,
      },
      {
        title: t("USC16"),
        price: user?.email,
      },
      
    ],
  };
  const summaryCard2 = {
    name: t("USC21"),
    icon: "fa-solid fa-building",
    card: [
      {
        title: t("USC22"),
        price: user?.stationName,
      },
      {
        title: t("USC23"),
        price: user?.stationCode,
      },
      {
        title: t("USC24"),
        price: user?.stationAddress,
      },
      {
        title: t("USC17"),
        price: user?.city,
      },
      {
        title: t("USC18"),
        price: user?.district,
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
      <Navbar />
      <div>
        <div>
          <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user?.profileImageUrl}
                alt=""
                className="w-12 h-12 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-gray-900">
                {user?.firstName || t("USCb")}
              </span>
              <span className="text-xl font-bold text-gray-900">
                {user?.lastName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFaultModalOpen(true)}
                className="text-white bg-red-500 hover:bg-red-800 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
              >
                {t("USCe")}
              </button>
              <button
                onClick={showUser}
                className="text-white bg-blue-500 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
              >
                {t("USCg")}
              </button>
              <button
                onClick={showPassword}
                className="text-white bg-blue-800 hover:bg-blue-950 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
              >
                {t("USCs")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <SummaryCard data={summaryCard1} />
          <SummaryCard data={summaryCard2} />
        </div>
      </div>
      <ModalExit
        isModalOpen={isFaultModalOpen}
        onClose={() => setIsFaultModalOpen(false)}
      />
    </div>
  );
}

export default Users;
