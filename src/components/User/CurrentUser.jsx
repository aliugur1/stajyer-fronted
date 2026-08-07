import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePut } from "../../hooks/usePut";
import { api } from "../../api/ApiKey";
import { useTranslation } from "react-i18next";
import ComplexNavbar from "../Navbar";
export function CurrentUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const getAllData = async () => {
      const data = await api(`/api/users/profile`); //burada ip de statics gidiyoruz
      setUserData(data.data);
    }; //şimdi bir daha kodu değiştirme hem objeyi asagıdaki şekilde getirebiliriz
    getAllData();
  }, []);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const { PutData } = usePut();
  const currentUser = async () => {
    //burada backend veri gönderiyoruz
    return await PutData("users", "profile", "", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      city: userData.city,
      district: userData.district,
      stationAddress: userData.address,
      stationName: userData.stationName,
      profileImageUrl: userData.profileImageUrl,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault(); //gereksiz yenilemeyi engeller
    setError("");
    setLoading(true);
    try {
      await currentUser(); //form  daTa yı backend gönderip kaydeDiyoruz
      navigate(`/users`);
    } catch (err) {
      //gönderirken hata olursa çalışıyor
      // console.log(err);
      setError(err.response?.data?.message || t("UCUm"));
    } finally {
      setLoading(false);
    }
  };
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (loading) {
    return <div className="text-blue-500">{t("UCUl")} </div>;
  }
  return (
    <div className="md:pl-16">
          <ComplexNavbar />
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
        <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Mepsan
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <div className="flex gap-4 w-full ">
                  <div className="flex-1">
                    <label
                      htmlFor="currentUser-firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("UCU1")}
                    </label>
                    <input
                      type="text"
                      helperText={t("UCU1h")}
                      id="currentUser-firstName"
                      label=""
                      value={userData.firstName || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={t("UCU1")}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="currentUser-lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("UCU2")}
                    </label>
                    <input
                      type="text"
                      id="currentUser-lastName"
                      value={userData.lastName || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={t("UCU2")}
                      required
                    />
                  </div>
                </div>
                <label
                  htmlFor="currentUser-email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("UCU3")}
                </label>
                <input
                  type="email"
                  id="currentUser-email"
                  value={userData.email || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("UCU3")}
                  required
                />
                <label
                  htmlFor="currentUser-phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("UCU4")}
                </label>
                <input
                  type="tel"
                  id="currentUser-phone"
                  value={userData.phone || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  minLength={11}
                  maxLength={11}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("UCU4")}
                />
                <label
                  htmlFor="currentUser-stationName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("UCU5")}
                </label>
                <input
                  type="text"
                  id="currentUser-stationName"
                  value={userData.stationName || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, stationName: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("UCU5")}
                />
                <label
                  htmlFor="currentUser-stationAddress"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("UCU6")}
                </label>
                <input
                  type="text"
                  id="currentUser-stationAddress"
                  value={userData.stationAddress || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, stationAddress: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("UCU6")}
                />
                <div className="flex gap-4 w-full ">
                  <div className="flex-1">
                    <label
                      htmlFor="currentUser-city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("UCU7")}
                    </label>
                    <input
                      type="text"
                      id="currentUser-city"
                      value={userData.city || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, city: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={t("UCU7")}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="currentUser-district"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("UCU8")}
                    </label>
                    <input
                      type="text"
                      id="currentUser-district"
                      value={userData.district || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, district: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={t("UCU8")}
                    />
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  {t("UCU9")}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? t("UCU10") : t("UCU11")}
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

export default CurrentUser;
