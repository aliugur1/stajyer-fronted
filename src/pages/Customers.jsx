import { useEffect, useState } from "react";
import { api } from "../api/ApiKey";
import customersList from "../components/Customers/CustomersList";
import ComplexNavbar from "../components/Navbar";
import ModalLoading from "../components/Modal/ModalLoading";
import ModalError from "../components/Modal/ModalError";

export default function Customers() {
  const [customersData, setCustomersData] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination,setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting , setSorting] = useState([])
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
        const data = await api(`/api/customers?${page}${search}${sort}`);
        setCustomersData(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, [globalFilter,pagination,sorting]);
  console.log(customersData)
  const customersListData = customersList({
    data: customersData?.data ?? [],
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,
    pagination,
    onPaginationChange:setPagination,
    sorting,
    onSortingChange:setSorting,
    rowCount: customersData?.pagination?.totalItems ?? 0,
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
      <div>{customersListData}</div>
    </div>
  );
}
