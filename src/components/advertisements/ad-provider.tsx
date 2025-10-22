"use client";

import { type ReactNode, createContext, useEffect, useState } from "react";

import { SubscriptionPlanEnum } from "@/constants/common";

import { AdBanner } from "./ad-banner";
import { AdModal } from "./ad-modal";

interface AdContextType {
  subscriptionPlan: SubscriptionPlanEnum;
  setSubscriptionPlan: (plan: SubscriptionPlanEnum) => void;
  showAds: boolean;
  dismissBannerAd: () => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

interface AdProviderProps {
  children: ReactNode;
  isShowAd: boolean;
}

export function AdProvider({ children, isShowAd }: AdProviderProps) {
  const [subscriptionPlan, setSubscriptionPlan] =
    useState<SubscriptionPlanEnum>(SubscriptionPlanEnum.FREE);
  const [showBannerAd, setShowBannerAd] = useState(false);
  const [showModalAd, setShowModalAd] = useState(false);

  useEffect(() => {
    if (subscriptionPlan === SubscriptionPlanEnum.FREE) {
      setShowBannerAd(true);
      setShowModalAd(true);
    }
  }, [subscriptionPlan]);

  const showAds = isShowAd;

  return (
    <AdContext.Provider
      value={{
        subscriptionPlan,
        setSubscriptionPlan,
        showAds,
        dismissBannerAd: () => setShowBannerAd(false),
      }}
    >
      {showAds && <AdBanner isVisible={showBannerAd} />}
      {children}
      {showAds && <AdModal showDelay={10000} isVisible={showModalAd} />}
    </AdContext.Provider>
  );
}
