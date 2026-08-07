import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePatch } from "../../hooks/usePatch";
import { useTranslation } from "react-i18next";

function ModalFault({ pump, isModalOpen, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { PatchData } = usePatch();
  const [status, setStatus] = useState("");
  const [promptCode, setPromptCode] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);
  const postM = async (e) => {
    e.preventDefault();
    if (!status || !promptCode || !promptMessage) {
      return;
    }
    try {
      await PatchData("pumps", pump, "/status", {
        status: status,
        faultCode: promptCode,
        faultMessage: promptMessage,
      });
      navigate(`/pumps/`);
    } catch (err) {
      console.error(t("modalFault1"), err.message, JSON.stringify(err.errors));
    }
  };
  if (!isModalOpen) {
    return null;
  }
  return (
    <div>
      {isModalOpen && (
        <div className="overflow-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50">
          <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {t("modalFault2")}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
                <span className="sr-only">{t("modalFault3")} </span>
              </button>
            </div>
            <form onSubmit={postM}>
              <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2.5 text-sm font-medium text-gray-900"
                  ></label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    id="category"
                    required
                    className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="" disabled>
                      {t("modalFault4")}
                    </option>
                    <option value="FAULTY">{t("modalFault5")}</option>
                    <option value="MAINTENANCE">{t("modalFault6")}</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="faultCode"
                    className="block mb-2.5 text-sm font-medium text-gray-900"
                  >
                    {t("modalFault7")}
                  </label>
                  <input
                    type="text"
                    name="faultCode"
                    id="faultCode"
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full px-3 py-2.5"
                    onChange={(e) => setPromptCode(e.target.value)}
                    placeholder={t("modalFault9")}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="faultMessage"
                    className="block mb-2.5 text-sm font-medium text-gray-900"
                  >
                    {t("modalFault8")}
                  </label>
                  <input
                    type="text"
                    name="faultMessage"
                    id="faultMessage"
                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full px-3 py-2.5"
                    onChange={(e) => setPromptMessage(e.target.value)}
                    placeholder={t("modalFault10")}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 border-t border-gray-200 pt-4 md:pt-6">
                <button
                  type="submit"
                  onClick={postM}
                  className="inline-flex items-center text-white bg-primary-600 hover:bg-primary-700 border border-transparent focus:ring-4 focus:ring-primary-200 font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4 me-1.5 -ms-0.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                  {t("modalFault11")}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-700 bg-gray-100 border border-gray-200 hover:bg-gray-200 hover:text-gray-900 focus:ring-4 focus:ring-gray-100 font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                >
                  {t("modalFault12")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalFault;
