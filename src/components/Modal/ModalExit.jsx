import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ModalExit({ isModalOpen, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
  const showExit = async () => {
    //burada token sıfırlayıp login atmam lazım
    // const evet = confirm("Çıkmak istediğinize emin misiniz");
    // if (!evet) {
    //   console.log("işlem kullanıcı tarafından iptal edildi");
    //   return;
    // }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    return await navigate(`/`);
  };
  if (!isModalOpen) {
    return null;
  }
  return (
    <div>
      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full md:inset-0 bg-black/50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 inset-e-2.5 text-gray-500 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                data-modal-hide="popup-modal"
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
                <span className="sr-only">{t("modalExit1")} </span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
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
                    d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-6 text-gray-500">{t("modalExit2")}</h3>
                <div className="flex items-center space-x-4 justify-center">
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={showExit}
                    className="text-white bg-red-500 box-border border border-transparent hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  >
                    {t("modalExit3")}
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={onClose}
                    className="text-gray-700 bg-gray-100 box-border border border-gray-200 hover:bg-gray-200 hover:text-gray-900 focus:ring-4 focus:ring-gray-100 font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                  >
                    {t("modalExit4")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalExit;
