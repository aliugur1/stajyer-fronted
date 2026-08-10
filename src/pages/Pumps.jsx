import { useEffect, useState } from "react";
import { api } from "../api/ApiKey";
import PumpsList from "../components/Pumps/PumpsList";
import ComplexNavbar from "../components/Navbar";
import ModalLoading from "../components/Modal/ModalLoading";
import ModalError from "../components/Modal/ModalError";

export default function Pumps() {
  const [pumpsData, setPumpsData] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const search = globalFilter ? `&search=${globalFilter}` : "";
        const page = `&page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`;
        const sort = sorting[0]
          ? `&sortBy=${sorting[0].id}&sortOrder=${sorting[0].desc ? "desc" : "asc"}`
          : "";
        const data = await api(`/api/pumps?${page}${search}${sort}`);
        setPumpsData(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, [globalFilter, pagination, sorting]);

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
        <PumpsList
          data={pumpsData.data ?? []}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          rowCount={pumpsData?.pagination?.totalItems ?? 0}
        />{" "}
      </div>
    </div>
  );
}
