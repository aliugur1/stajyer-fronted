import { useTranslation } from "react-i18next";

function Labels() {
  const { t } = useTranslation();

  const TypeLabels = {
    PREMIUM_DIESEL: t("FT1"),
    DIESEL: t("FT2"),
    GASOLINE_95: t("FT3"),
    GASOLINE_97: t("FT4"),
    LPG: t("FT5"),
    ACTIVE: t("FT6"),
    PASSIVE: t("FT7"),
    FAULTY: t("FT8"),
    MAINTENANCE: t("FT9"),
    ON_ACCOUNT: t("FT10"),
    CASH: t("FT11"),
    FLEET_CARD: t("FT12"),
    CREDIT_CARD: t("FT13"),
    PUMP: t("FT14"),
    USER: t("FT15"),
    CUSTOMER: t("FT16"),
    SALE: t("FT17"),
    CORPORATE: t("FT18"),
    INDIVIDUAL: t("FT19"),
    GOLD: t("FT20"),
    BRONZE: t("FT21"),
    SILVER: t("FT22"),
    PLATINUM: t("FT23"),
  };
  return TypeLabels;
}

export default Labels;
