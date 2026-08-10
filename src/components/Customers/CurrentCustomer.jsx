import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/ApiKey";
import CompanyCustomer from "../Customers/CompanyCustomer";
import { usePut } from "../../hooks/usePut";
import ModalLoading from "../Modal/ModalLoading";
import { useTranslation } from "react-i18next";
import ComplexNavbar from "../Navbar";
import ModalError from "../Modal/ModalError";

function CurrentCustomer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [customerData, setCustomerData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api(`/api/customers/${id}`); //burada ip de statics gidiyoruz
        setCustomerData(data.data.customer);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }; //şimdi bir daha kodu değiştirme hem objeyi asagıdaki şekilde getirebiliriz
    getAllData();
  }, [id]);
  const { PutData } = usePut();
  const currentUser = async () => {
    //burada backend veri gönderiyoruz
    return await PutData("customers", id, "", {
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
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault(); //gereksiz yenilemeyi engeller
    setError("");
    setLoading(true);
    try {
      await currentUser(); //form  daTa yı backend gönderip kaydeDiyoruz
      navigate(`/customers/${id}`);
    } catch (err) {
      //gönderirken hata olursa çalışıyor

      setError(err.response?.data?.message || t("current.err"));
    } finally {
      setLoading(false);
    }
  };
  const controlCustomerType = () => {
    if (customerData?.customerType !== "INDIVIDUAL") {
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
      <ModalError
        isModalOpen={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <ModalLoading isModalOpen={loading} />
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
              <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("current.n")}
              </h3>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleRegister}
              >
                <div>
                  <div className="flex gab-8 w-full ">
                    <div className="flex-1">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("current.name")}
                      </label>
                      <input
                        type="text"
                        helperText={t("current.nameH")}
                        id="firstName"
                        label=""
                        value={customerData.firstName || ""}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            firstName: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("current.name")}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("current.last")}
                      </label>
                      <input
                        type="text"
                        helperText={t("current.lastH")}
                        id="lastName"
                        label=""
                        value={customerData.lastName || ""}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            lastName: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("current.last")}
                        required
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("current.email")}
                  </label>
                  <input
                    type="email"
                    helperText={t("current.emailH")}
                    id="email"
                    label=""
                    value={customerData.email || ""}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        email: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("current.email")}
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("current.phone")}
                  </label>
                  <input
                    type="tel"
                    helperText={t("current.phoneH")}
                    id="phone"
                    label=""
                    value={customerData.phone || ""}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        phone: e.target.value,
                      })
                    }
                    minLength={11}
                    maxLength={11}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("current.phone")}
                    required
                  />
                  <label
                    htmlFor="plateNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("current.plate")}
                  </label>
                  <input
                    type="text"
                    helperText={t("current.plateH")}
                    id="plateNumber"
                    label=""
                    value={customerData.plateNumber || ""}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        plateNumber: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("current.plate")}
                    required
                  />
                  <div className="flex gab-8 w-full ">
                    <div className="flex-1">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("current.city")}
                      </label>
                      <input
                        type="text"
                        helperText={t("current.cityH")}
                        id="city"
                        label=""
                        value={customerData.city || ""}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            city: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("current.city")}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="district"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {t("current.semt")}
                      </label>
                      <input
                        type="text"
                        helperText={t("current.semtH")}
                        id="district"
                        label=""
                        value={customerData.district || ""}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            district: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={t("current.semt")}
                        required
                      />
                    </div>
                  </div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("current.adres")}
                  </label>
                  <input
                    type="text"
                    helperText={t("current.adresH")}
                    id="address"
                    label=""
                    value={customerData.address || ""}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        address: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("current.adres")}
                    required
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {loading && (
                  <p>
                    <ModalLoading />{" "}
                  </p>
                )}
                {controlCustomerType()}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    {t("current.geri")}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {loading ? t("current.button") : t("current.buttonH")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CurrentCustomer;
