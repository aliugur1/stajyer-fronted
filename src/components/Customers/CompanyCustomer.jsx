import { useTranslation } from "react-i18next";

function CompanyCustomer({ customerData, setCustomerData }) {
  const { t } = useTranslation();
  return (
    <>
      <label
        htmlFor="companyName"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {t("company.name")}
      </label>
      <input
        type="text"
        helperText={t("company.nameHelper")}
        id="companyName"
        label=""
        value={customerData.companyName || ""}
        onChange={(e) =>
          setCustomerData({
            ...customerData,
            companyName: e.target.value,
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={t("company.name")}
        required
      />
      <div className="flex gab-8 w-full ">
        <div className="flex-1">
          <label
            htmlFor="taxNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {t("company.taxN")}
          </label>
          <input
            type="text"
            helperText={t("company.taxNH")}
            id="taxNumber"
            label=""
            value={customerData.taxNumber || ""}
            onChange={(e) =>
              setCustomerData({
                ...customerData,
                taxNumber: e.target.value,
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t("company.taxN")}
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="taxOffice"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {t("company.taxO")}
          </label>
          <input
            type="text"
            helperText={t("company.taxOH")}
            id="taxOffice"
            label=""
            value={customerData.taxOffice || ""}
            onChange={(e) =>
              setCustomerData({
                ...customerData,
                taxOffice: e.target.value,
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t("company.taxO")}
            required
          />
        </div>
      </div>
    </>
  );
}

export default CompanyCustomer;
