import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/ApiKey";
import ModalLoading from "..//components/Modal/ModalLoading";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // veriyi form data tutup
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const createUser = async (newUser) => {
    //burada backend veri gönderiyoruz
    return await axios.post(`${API_URL}/api/auth/register`, newUser);
  };
  const handleRegister = async (e) => {
    e.preventDefault(); //gereksiz yenilemeyi engeller
    if (formData.password !== formData.passwordConfirm) {
      //şifreleri kontrol ediyoruz
      alert(t("signup.alert1"));
      setError(t("signup.alert1"));
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createUser(formData); //form  daTa yı backend gönderip kaydeDiyoruz
      navigate("/");
    } catch (err) {
      //gönderirken hata olursa çalışıyor
      console.log(err);
      setError(err.response?.data?.message || t("signUp.er"));
    } finally {
      setLoading(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (loading) {
    return (
      <div className="text-blue-500">
        <ModalLoading />{" "}
      </div>
    );
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Mepsan
          </h1>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("signUp.create")}
            </h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <div className="flex gap-4 w-full ">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900
                  dark:text-white"
                    >
                      {t("signUp.name")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={t("signUp.name")}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("signUp.Last")}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={t("signUp.Last")}
                      required
                    />
                  </div>
                </div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("login.email")}
                  required
                />
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("signUp.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  minLength={11}
                  maxLength={11}
                  
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("signUp.phone")}
                  required
                />
                <div className="flex gap-4 w-full ">
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("login.password")}
                    </label>
                     <div className="relative">
                    <input
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      minLength={8}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="*********"
                      required
                    />
                    <button
                    type="button"
                    onClick={handleClickShowPassword}
                    aria-label={
                      showPassword2
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
                  <div className="flex-1">
                    <label
                      htmlFor="passwordConfirm"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {t("signUp.ConfirmPassword")}
                    </label>
                     <div className="relative">
                    <input
                      name="passwordConfirm"
                      type={showPassword2 ? "text" : "password"}
                      id="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passwordConfirm: e.target.value,
                        })
                      }
                      minLength={8}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="*********"
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
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 cursor-pointer w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t("signUp.signup")}
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("signUp.home")}
                  <a
                    href=""
                    onClick={() => navigate("/")}
                    className=" hover:cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500 cursor:pointer;"
                  >
                    {t("signUp.home1")}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
