import { useEffect, useState } from "react";
import { api } from "../api/ApiKey";
import pumpsList from "../components/Pumps/PumpsList";
import ComplexNavbar from "../components/Navbar";
import ModalLoading from "../components/Modal/ModalLoading";

export default function Pumps() {
  const [pumpsData, setPumpsData] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  useEffect(() => {
    const getAllData = async () => {
      const search = globalFilter ? `&search=${globalFilter}` : "";
      const data = await api(`/api/pumps?${search}`);
      setPumpsData(data);
    };
    getAllData();
  }, [globalFilter]);
  const pumpsListData = pumpsList({
    data: pumpsData?.data ?? [],
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,
  });
  if (!pumpsListData) {
    return (
      <div>
        <ModalLoading />{" "}
      </div>
    );
  }
  return (
    <div className="md:pl-16">
      <ComplexNavbar />
      <div>{pumpsListData}</div>
    </div>
  );
}
