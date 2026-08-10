import { useEffect, useState } from "react";
import { api } from "../api/ApiKey";
import pumpsList from "../components/Pumps/PumpsList";
import ComplexNavbar from "../components/Navbar";
import ModalLoading from "../components/Modal/ModalLoading";
import ModalError from "../components/Modal/ModalError";

export default function Pumps() {
  const [pumpsData, setPumpsData] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const search = globalFilter ? `&search=${globalFilter}` : "";
        const data = await api(`/api/pumps?${search}`);
        setPumpsData(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, [globalFilter]);
  const pumpsListData = pumpsList({
    data: pumpsData?.data ?? [],
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,
  });
  return (
    <div className="md:pl-16">
      <ModalError
        isModalOpen={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <ModalLoading isModalOpen={loading} />
      <ComplexNavbar />
      <div>{pumpsListData}</div>
    </div>
  );
}
