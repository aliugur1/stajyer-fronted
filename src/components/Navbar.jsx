import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api/ApiKey";
import DateNumberFormat from "./DateNumberFormat";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import iconUsers from "../assets/iconUsers.png";
import mepsanlogo from "../assets/mepsanlogo.jpeg";
import ModalExit from "../components/Modal/ModalExit";
import { useTranslation } from "react-i18next";
import ModalError from "../components/Modal/ModalError";
import ModalLoading from "./Modal/ModalLoading";
// sidebar nav list
export default function ComplexNavbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userData, setUserData] = useState("");
  const [isFaultModalOpen, setIsFaultModalOpen] = useState(false);
  const menuRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await api("/api/users");
        if (data?.data?.profileImageUrl == null) {
          setUserData({
            ...data,
            data: {
              ...data?.data,
              profileImageUrl: iconUsers,
            },
          });
        } else {
          setUserData(data);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, []);
  const user = userData.data;
  const navListItems = [
    {
      label: t("nav.dashboard"),
      icon: CodeBracketSquareIcon,
      path: "/dashboard",
    },
    {
      label: t("nav.pumps"),
      icon: CubeTransparentIcon,
      path: "/pumps",
    },
    {
      label: t("nav.customers"),
      icon: UserCircleIcon,
      path: "/customers",
    },
  ];
  const profileMenuItems = [
    {
      label: t("nav.Profil"),
      icon: user?.profileImageUrl || UserCircleIcon,
      path: "/users",
    },
    {
      label: t("nav.MenuUpdate"),
      icon: Cog6ToothIcon,
      path: "/users/profile",
    },
    {
      label: t("nav.MenuPassword"),
      icon: LifebuoyIcon,
      path: "/users/change",
    },
    {
      label: t("nav.MenuExit"),
      icon: PowerIcon,
      onClick: () => setIsFaultModalOpen(true),
    },
  ];
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") setMenuIsOpen(false);
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // labels are hidden on the collapsed desktop rail and fade in on hover,
  // but stay visible when the profile menu forces the rail open
  const labelClass = menuIsOpen
    ? "opacity-100 whitespace-nowrap"
    : "whitespace-nowrap opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100";
  const [lang, setLang] = useState("TR");
  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "TR" ? "EN" : "TR"));
    i18n.changeLanguage(i18n.language == "tr" ? "en" : "tr");
  };
  return (
    <>
      <ModalError
        isModalOpen={!!error}
        message={error}
        onClose={() => setError("")}
      />
      <ModalLoading isModalOpen={loading} />
      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          aria-hidden="true"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <nav
        className={`group fixed left-0 top-0 z-40 flex h-svh w-64 shrink-0 flex-col border-r border-gray-800 bg-gray-900 p-3 text-white shadow-md transition-all duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${menuIsOpen ? "md:w-64" : "overflow-hidden md:w-16 md:hover:w-64"}`}
        aria-label="sidebar navigation"
      >
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            setShowSidebar(false);
            navigate("/dashboard");
          }}
          className="mb-2 flex cursor-pointer items-center gap-2 px-1 py-1.5"
        >
          <img
            src={mepsanlogo}
            alt="MEPSAN"
            className="h-9 w-9 shrink-0 rounded-lg object-cover"
          />
          <span className={`text-lg font-bold ${labelClass}`}>MEPSAN</span>
        </a>
        <div className={labelClass}>
          <DateNumberFormat />
        </div>
        <div className="mt-4 flex flex-1 flex-col gap-1 ">
          {navListItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <a
                key={label}
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setShowSidebar(false);
                  navigate(path);
                }}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-gray-800 text-primary-400"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0  " />
                <span className={labelClass}>{label}</span>
              </a>
            );
          })}
        </div>
        <button
          type="button"
          onClick={toggleLanguage}
          className=" cursor-pointer
                   bg-white text-blue-600 font-bold px-4 py-2 rounded-full 
                   shadow-md hover:bg-blue-50 hover:text-blue-700 
                   transition-all duration-300  text-center"
        >
          {lang}
        </button>
        <div className="relative mt-2 pt-2" ref={menuRef}>
          {menuIsOpen && (
            <div className=" absolute bottom-full left-0 z-50 mb-2 w-56 rounded-lg border border-gray-700 bg-gray-800 p-1 shadow-lg">
              {profileMenuItems.map(
                ({ label, icon: Icon, path, onClick }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setMenuIsOpen(false);
                        if (onClick) {
                          onClick();
                        } else {
                          navigate(path);
                        }
                      }}
                      className={`cursor-pointer flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm font-normal ${
                        isLastItem
                          ? "text-red-400 hover:bg-red-500/10"
                          : "text-gray-200 hover:bg-gray-700"
                      }`}
                    >
                      {typeof Icon === "string" ? (
                        <img
                          className="h-4 w-4 rounded-full object-cover"
                          src={Icon}
                          alt={label}
                        />
                      ) : (
                        <Icon
                          className={`cursor-pointer h-4 w-4 ${isLastItem ? "text-red-400" : ""}`}
                          strokeWidth={2}
                        />
                      )}
                      <span>{label}</span>
                    </button>
                  );
                },
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => setMenuIsOpen((cur) => !cur)}
            className="cursor-pointer  flex w-full items-center gap-2 rounded-lg p-2 text-left transition-colors hover:bg-gray-800"
          >
            <img
              alt="avatar"
              className=" h-9 w-9 shrink-0 rounded-full border border-gray-700 object-cover"
              src={user?.profileImageUrl}
            />
            <span
              className={` flex-1 truncate text-sm font-medium ${labelClass}`}
            >
              {user
                ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
                  "Kullanıcı"
                : "..."}
            </span>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 shrink-0 transition-transform ${labelClass} ${
                menuIsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </nav>
      <ModalExit
        isModalOpen={isFaultModalOpen}
        onClose={() => setIsFaultModalOpen(false)}
      />
      <button
        type="button"
        onClick={() => setShowSidebar((cur) => !cur)}
        className="fixed right-4 top-4 z-40 rounded-full bg-primary-600 p-3 text-white shadow-lg md:hidden"
      >
        {showSidebar ? (
          <XMarkIcon className="h-5 w-5" />
        ) : (
          <Bars3Icon className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
