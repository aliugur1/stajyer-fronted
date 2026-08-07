import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyCustomer from "../Customers/CompanyCustomer";
import { usePost } from "../../hooks/usePost";
import { useTranslation } from "react-i18next";
import ComplexNavbar from "../Navbar";

export function NewCustomer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [customerData, setCustomerData] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const { PostData } = usePost();
  const [customerType,setCustomerType]= useState(location.state?.customerType || "INDIVIDUAL")
  const newCustomer = async () => {
    //burada backend veri gönderiyoruz
    return await PostData("customers", {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      plateNumber: customerData.plateNumber,
      city: customerData.city,
      district: customerData.district,
      address: customerData.address,
      companyName: customerData.companyName,
      taxNumber: customerData.taxNumber,
      taxOffice: customerData.taxOffice,
      customerType,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault(); //gereksiz yenilemeyi engeller
    setError("");
    setLoading(true);
    try {
      await newCustomer(); //form  daTa yı backend gönderip kaydeDiyoruz
      navigate(`/customers`);
    } catch (err) {
      //gönderirken hata olursa çalışıyor
      setError(err.response?.data?.message || t("newCustomer.err"));
    } finally {
      setLoading(false);
    }
  };
  const controlCustomerType = () => {
    if (
      customerData?.customerType !== "INDIVIDUAL" &&
      customerType !== "INDIVIDUAL"
    ) {
      return (
        <CompanyCustomer
          customerData={customerData}
          setCustomerData={setCustomerData}
        />
      );
    }
    return null;
  };
  return (
    <div className="md:pl-16">
          <ComplexNavbar />
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Mepsan
          </h1>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-gray-900">
                {t("customerListButton1")}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCustomerType("INDIVIDUAL")}
                className="text-white bg-blue-600 hover:bg-blue-700 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
              >
                {t("customerListButton3")}
              </button>
              <button
                onClick={() => setCustomerType("CORPORATE")}
                className="text-white bg-blue-900 hover:bg-blue-950 box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
              >
                {t("customerListButton2")}
              </button>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <div className="flex gap-4 w-full ">
                  <div className="flex-1">
                    <label
                      htmlFor="NewCustomer-firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("newCustomer.name")}
                    </label>
                    <input
                      type="text"
                      id="NewCustomer-firstName"
                      helperText={t("newCustomer.nameH")}
                      value={customerData.firstName || ""}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          firstName: e.target.value,
                        })
                      }
                      className={
                        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      placeholder={t("newCustomer.name")}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="NewCustomer-lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("newCustomer.last")}
                    </label>
                    <input
                      type="text"
                      id="NewCustomer-lastName"
                      helperText={t("newCustomer.lastH")}
                      value={customerData.lastName || ""}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          lastName: e.target.value,
                        })
                      }
                      className={
                        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      placeholder={t("newCustomer.last")}
                      required
                    />
                  </div>
                </div>
                <label
                  htmlFor="NewCustomer-email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("newCustomer.email")}
                </label>
                <input
                  type="email"
                  id="NewCustomer-email"
                  helperText={t("newCustomer.emailH")}
                  value={customerData.email || ""}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, email: e.target.value })
                  }
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  placeholder={t("newCustomer.email")}
                  required
                />
                <label
                  htmlFor="NewCustomer-phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("newCustomer.phone")}
                </label>
                <input
                  type="tel"
                  id="NewCustomer-phone"
                  helperText={t("newCustomer.phoneH")}
                  value={customerData.phone || ""}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, phone: e.target.value })
                  }
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  placeholder={t("newCustomer.phone")}
                  required
                />
                <label
                  htmlFor="NewCustomer-plateNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("newCustomer.plate")}
                </label>
                <input
                  type="text"
                  id="NewCustomer-plateNumber"
                  helperText={t("newCustomer.plateH")}
                  value={customerData.plateNumber || ""}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      plateNumber: e.target.value,
                    })
                  }
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  placeholder={t("newCustomer.plate")}
                  required
                />
                <div className="flex gap-4 w-full ">
                  <div className="flex-1">
                    <label
                      htmlFor="NewCustomer-city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("newCustomer.city")}
                    </label>
                    <input
                      type="text"
                      id="NewCustomer-city"
                      helperText={t("newCustomer.cityH")}
                      value={customerData.city || ""}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          city: e.target.value,
                        })
                      }
                      className={
                        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      placeholder={t("newCustomer.city")}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="NewCustomer-district"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("newCustomer.semt")}
                    </label>
                    <input
                      type="text"
                      id="NewCustomer-district"
                      helperText={t("newCustomer.semtH")}
                      value={customerData.district || ""}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          district: e.target.value,
                        })
                      }
                      className={
                        "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }
                      placeholder={t("newCustomer.semt")}
                      required
                    />
                  </div>
                </div>
                <label
                  htmlFor="NewCustomer-address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("newCustomer.adres")}
                </label>
                <input
                  type="text"
                  id="NewCustomer-address"
                  helperText={t("newCustomer.adresH")}
                  value={customerData.address || ""}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      address: e.target.value,
                    })
                  }
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  placeholder={t("newCustomer.adres")}
                  required
                />
              </div>
              {controlCustomerType()}
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(`/customers`)}
                  disabled={loading}
                  className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  {t("newCustomer.geri")}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? t("newCustomer.button") : t("newCustomer.buttonH")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section></div>

  );
}

export default NewCustomer;
