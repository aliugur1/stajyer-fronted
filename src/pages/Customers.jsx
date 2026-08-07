import { useEffect, useState } from "react";
import { api } from "../api/ApiKey";
import customersList from "../components/Customers/CustomersList";
import ComplexNavbar from "../components/Navbar";
import ModalLoading from "../components/Modal/ModalLoading";

export default function Customers() {
  const [customersData, setCustomersData] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  useEffect(() => {
    const getAllData = async () => {
      const search = globalFilter ? `&search=${globalFilter}` : "";
      const data = await api(`/api/customers?${search}`);
      setCustomersData(data);
    };
    getAllData();
  }, [globalFilter]);
  const customersListData = customersList({
    data: customersData?.data ?? [],
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,
  });
  if (!customersListData) {
    return (
      <div>
        <ModalLoading />{" "}
      </div>
    );
  }
  return (
    <div className="md:pl-16">
      <ComplexNavbar />
      <div>{customersListData}</div>
    </div>
  );
}
