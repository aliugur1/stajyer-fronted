import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import ModalLoading from "../components/Modal/ModalLoading";
import ModalError from "../components/Modal/ModalError";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(
    !!localStorage.getItem("rememberedMail"),
  );
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    loading,
    login,
  } = useLogin();
  useEffect(() => {
    const localEmail = localStorage.getItem("rememberedMail");
    const localPassword = localStorage.getItem("rememberedPassword");
    if (localEmail) setEmail(localEmail);
    if (localPassword) setPassword(localPassword);
  }, [setEmail, setPassword]);
  const showSignUp = async () => {
    await navigate("/register");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(rememberMe);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div>
      <ModalError
        isModalOpen={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <ModalLoading isModalOpen={loading} />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className=" hover:cursor-pointer flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <h1 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MEPSAN
            </h1>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {t("login.title")}
              </h3>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
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
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="flex gab-8 w-full ">
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
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className=" hover:cursor-pointer text-gray-500 dark:text-gray-300"
                      >
                        {t("login.remember")}
                      </label>
                    </div>
                  </div>
                  {/* <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a> */}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  hover:cursor-pointer"
                >
                  {t("login.login")}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {t("login.p")}
                  <a
                    href=""
                    onClick={showSignUp}
                    className=" hover:cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500 cursor:pointer;"
                  >
                    {t("login.signup")}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
