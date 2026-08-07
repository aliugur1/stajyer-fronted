import { usePut } from "../../hooks/usePut";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import ComplexNavbar from "../Navbar";
export function ChangePassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const { PutData } = usePut();
  const changePassword = async () => {
    return await PutData("users", "change-password", "", {
      currentPassword: formData.currentPassword,
      newPassword: formData.password,
      newPasswordConfirm: formData.passwordConfirm,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault(); //gereksiz yenilemeyi engeller
    if (formData.password !== formData.passwordConfirm) {
      //şifreleri kontrol ediyoruz
      alert(t("UCPa"));
      setError(t("UCPa"));
      return;
    }
    setError("");
    setLoading(true);
    try {
      await changePassword(); //form  daTa yı backend gönderip kaydeDiyoruz
      navigate("/users");
    } catch (err) {
      //gönderirken hata olursa çalışıyor
      console.log(err);
      setError(err.response?.data?.message || t("UCPm"));
    } finally {
      setLoading(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (loading) {
    return <div className="text-blue-500">{t("UCPl")} </div>;
  }
  return (
    <div className="md:pl-16">
          <ComplexNavbar />
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Mepsan
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="current-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("UCP1")}
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                    minLength={8}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleClickShowPassword}
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("UCP2")}
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword2 ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    minLength={8}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleClickShowPassword2}
                    aria-label={
                      showPassword2
                        ? "hide the password"
                        : "display the password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                  >
                    {showPassword2 ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="new-passwordConfirm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("UCP3")}
                </label>
                <div className="relative">
                  <input
                    id="new-passwordConfirm"
                    type={showPassword3 ? "text" : "password"}
                    value={formData.passwordConfirm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passwordConfirm: e.target.value,
                      })
                    }
                    minLength={8}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleClickShowPassword3}
                    aria-label={
                      showPassword3
                        ? "hide the password"
                        : "display the password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                  >
                    {showPassword3 ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}//-1 yapınca geri sayfaya gidiyor
                  disabled={loading}
                  className="w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  {t("UCP.geri")}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? t("UCP.button") : t("UCP.buttonH")}
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

export default ChangePassword;
