import { useTranslation } from "react-i18next";
import Labels from "../Labels";
function TableChart({ rows01, rows02 }) {
  const { t } = useTranslation();
  const TypeLabels = Labels()
  return (
    <>
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-slate-900 mb-6">
          {t("tableChart.name1")}{" "}
        </h3>
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="bg-neutral-secondary-soft border-b border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r00")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r01")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r02")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r03")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r04")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r05")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r06")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("customer.FDB4")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r07")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r08")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r09")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows02?.slice(-5).map((row02) => (
                <tr
                  key={row02?.id}
                  className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {row02?.pumpId}
                  </th>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row02?.receiptNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row02?.createdAt &&
                        new Date(row02?.createdAt).toLocaleString("tr-TR")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row02?.customerId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {TypeLabels[row02?.fuelType] ||row02?.fuelType}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-mono">
                    {row02?.liter.toLocaleString("tr-TR")} L
                  </td>
                  {/* Ciro */}
                  <td className="px-6 py-4 font-bold text-heading">
                    {row02?.unitPrice.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </td>
                  <td className="px-6 py-4 font-bold text-heading">
                    {row02?.totalAmount.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {TypeLabels[row02?.paymentType] ||row02?.paymentType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row02?.plateNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row02?.attendantName}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Eğer veri yoksa boş durum mesajı gösterir */}
              {rows02?.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    {t("tableChart.not")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-slate-900 mb-6">
          {" "}
          {t("tableChart.name2")}
        </h3>
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="bg-neutral-secondary-soft border-b border-default">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r1")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r2")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r3")}
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  {t("tableChart.r4")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows01?.slice(-5).map((row01) => (
                <tr
                  key={row01?.id}
                  className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {TypeLabels[row01?.entityType] ||row01?.entityTypeType}
                  </th>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row01?.createdAt &&
                        new Date(row01?.createdAt).toLocaleString("tr-TR")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row01?.description}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-secondary-soft rounded text-xs font-semibold">
                      {row01?.title}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Eğer veri yoksa boş durum mesajı gösterir */}
              {rows01?.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-400"
                  ></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TableChart;
