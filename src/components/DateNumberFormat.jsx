// import { useState, useEffect } from "react";
// import { api } from "../api/ApiKey";
import ModalLoading from "../components/Modal/ModalLoading";

function DateNumberFormat() {
  //   const [data, setData] = useState();
  //   useEffect(() => {
  //     const getAllData = async () => {
  //       const data01 = await api(`/users/profile"`);
  //       setData(data01);
  //     };
  //     getAllData();
  //   }, []);
  //   console.log(data);
  const formatDate = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format();
  //   const formatNumber = new Intl.NumberFormat("tr-TR", {
  //     style: "currency",
  //     currency: "TRY",
  //   }).format();
  if (!formatDate) {
    return (
      <div>
        <ModalLoading />
      </div>
    );
  }
  return (
    <div>
      <span>{formatDate}</span>
      {/* <span>Current Balance: {formatNumber}</span> */}
    </div>
  );
}

export default DateNumberFormat;
