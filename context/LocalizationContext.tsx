"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "USD_IN" | "INR" | "USD" | "EUR" | "GBP" | "AED" | "CAD" | "AUD";
export type LanguageCode = "en" | "hi" | "es" | "de" | "fr" | "ja";

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rate: number; // multiplier against base INR
}

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD_IN: { code: "USD_IN", label: "India (USD $)", symbol: "$", rate: 0.012 },
  INR: { code: "INR", label: "India (INR ₹)", symbol: "₹", rate: 1.0 },
  USD: { code: "USD", label: "United States (USD $)", symbol: "$", rate: 0.012 },
  EUR: { code: "EUR", label: "Europe (EUR €)", symbol: "€", rate: 0.011 },
  GBP: { code: "GBP", label: "United Kingdom (GBP £)", symbol: "£", rate: 0.0094 },
  AED: { code: "AED", label: "UAE (AED د.إ)", symbol: "AED", rate: 0.044 },
  CAD: { code: "CAD", label: "Canada (CAD $)", symbol: "C$", rate: 0.016 },
  AUD: { code: "AUD", label: "Australia (AUD $)", symbol: "A$", rate: 0.018 },
};

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: { code: "en", label: "English" },
  hi: { code: "hi", label: "हिंदी (Hindi)" },
  es: { code: "es", label: "Español" },
  de: { code: "de", label: "Deutsch" },
  fr: { code: "fr", label: "Français" },
  ja: { code: "ja", label: "日本語" },
};

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    home: "HOME",
    store: "STORE",
    app: "APP",
    searchPlaceholder: "Search products, lighting systems...",
    lightinmotionCollection: "LIGHTINMOTION Collection",
    tvSyncSet: "TV Sync Set",
    monitorSyncSet: "Monitor Sync Set",
    bestSelling: "BEST SELLING",
    sale: "SALE",
    diwaliDeal: "Diwali Special Deal",
    shopNow: "Shop Now",
    tvBacklightTitle: "TV Backlight",
    monitorBacklightTitle: "LightinMotion Monitor Backlight",
    lampLightTitle: "LightinMotion Lamp Light",
    monitorBarTitle: "Monitor Bar Lights",
    customSyncTitle: "Custom Sync Lights",
    cloudLightsTitle: "Cloud Lights",
    subscribeEmails: "Subscribe to our emails",
    subscribeHeading: "Stay updated on our latest innovative products and exclusive sales.",
    enterEmail: "Enter email address...",
    thankYouSubscribe: "Thank you for subscribing!",
    programs: "Programs",
    affiliateProgram: "Affiliate Program",
    explore: "Explore",
    officialOnlineStore: "Official Online Store",
    onlineReseller: "Online Reseller",
    aboutUs: "About Us",
    policy: "Policy",
    shippingPolicy: "Shipping Policy",
    returnPolicy: "Return Policy",
    warrantyPolicy: "Warranty Policy",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    copyright: "Copyright © LIGHTINMOTION 2026.",
  },
  hi: {
    home: "होम",
    store: "स्टोर",
    app: "ऐप",
    searchPlaceholder: "उत्पाद, लाइटिंग सिस्टम खोजें...",
    lightinmotionCollection: "LIGHTINMOTION संग्रह",
    tvSyncSet: "टीवी सिंक सेट",
    monitorSyncSet: "मॉनिटर सिंक सेट",
    bestSelling: "बेस्ट सेलिंग",
    sale: "सेल",
    diwaliDeal: "दिवाली विशेष डील",
    shopNow: "अभी खरीदें",
    tvBacklightTitle: "टीवी बैकलाइट",
    monitorBacklightTitle: "लाइटइनमोशन मॉनिटर बैकलाइट",
    lampLightTitle: "लाइटइनमोशन लैंप लाइट",
    monitorBarTitle: "मॉनिटर बार लाइट्स",
    customSyncTitle: "कस्टम सिंक लाइट्स",
    cloudLightsTitle: "क्लाउड लाइट्स",
    subscribeEmails: "हमारे ईमेल की सदस्यता लें",
    subscribeHeading: "हमारे नवीनतम उत्पादों और विशेष छूट के बारे में अपडेट रहें।",
    enterEmail: "ईमेल पता दर्ज करें...",
    thankYouSubscribe: "सदस्यता लेने के लिए धन्यवाद!",
    programs: "कार्यक्रम",
    affiliateProgram: "सहबद्ध कार्यक्रम",
    explore: "एक्सप्लोर करें",
    officialOnlineStore: "आधिकारिक ऑनलाइन स्टोर",
    onlineReseller: "ऑनलाइन पुनर्विक्रेता",
    aboutUs: "हमारे बारे में",
    policy: "नीति",
    shippingPolicy: "शिपिंग नीति",
    returnPolicy: "वापसी नीति",
    warrantyPolicy: "वारंटी नीति",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    copyright: "कॉपीराइट © LIGHTINMOTION 2026.",
  },
  es: {
    home: "INICIO",
    store: "TIENDA",
    app: "APP",
    searchPlaceholder: "Buscar productos, iluminación...",
    lightinmotionCollection: "Colección LIGHTINMOTION",
    tvSyncSet: "Set de sincronización TV",
    monitorSyncSet: "Set de sincronización Monitor",
    bestSelling: "MÁS VENDIDO",
    sale: "OFERTA",
    diwaliDeal: "Oferta Especial Diwali",
    shopNow: "Comprar ahora",
    tvBacklightTitle: "Retroiluminación para TV",
    monitorBacklightTitle: "Retroiluminación para Monitor LightinMotion",
    lampLightTitle: "Lámpara de ambiente LightinMotion",
    monitorBarTitle: "Barras de luz para monitor",
    customSyncTitle: "Luces de sincronización personalizadas",
    cloudLightsTitle: "Luces nube atmosféricas",
    subscribeEmails: "Suscríbete a nuestros correos",
    subscribeHeading: "Mantente al tanto de nuestros últimos productos y ofertas exclusivas.",
    enterEmail: "Introduce tu correo electrónico...",
    thankYouSubscribe: "¡Gracias por suscribirte!",
    programs: "Programas",
    affiliateProgram: "Programa de afiliados",
    explore: "Explorar",
    officialOnlineStore: "Tienda online oficial",
    onlineReseller: "Distribuidor online",
    aboutUs: "Sobre nosotros",
    policy: "Políticas",
    shippingPolicy: "Política de envío",
    returnPolicy: "Política de devolución",
    warrantyPolicy: "Política de garantía",
    privacyPolicy: "Política de privacidad",
    termsOfService: "Términos de servicio",
    copyright: "Derechos de autor © LIGHTINMOTION 2026.",
  },
  de: {
    home: "STARTSEITE",
    store: "SHOP",
    app: "APP",
    searchPlaceholder: "Produkte, Beleuchtung suchen...",
    lightinmotionCollection: "LIGHTINMOTION Kollektion",
    tvSyncSet: "TV Sync Set",
    monitorSyncSet: "Monitor Sync Set",
    bestSelling: "BESTSELLER",
    sale: "ANGEBOT",
    diwaliDeal: "Diwali Spezial-Angebot",
    shopNow: "Jetzt kaufen",
    tvBacklightTitle: "TV Hintergrundbeleuchtung",
    monitorBacklightTitle: "LightinMotion Monitor Beleuchtung",
    lampLightTitle: "LightinMotion Lampenlicht",
    monitorBarTitle: "Monitor Lichtbalken",
    customSyncTitle: "Custom Sync Lichter",
    cloudLightsTitle: "Cloud Lichter",
    subscribeEmails: "Newsletter abonnieren",
    subscribeHeading: "Bleiben Sie über innovative Produkte und Rabatte informiert.",
    enterEmail: "E-Mail-Adresse eingeben...",
    thankYouSubscribe: "Vielen Dank für Ihre Anmeldung!",
    programs: "Programme",
    affiliateProgram: "Partnerprogramm",
    explore: "Entdecken",
    officialOnlineStore: "Offizieller Online-Shop",
    onlineReseller: "Online-Händler",
    aboutUs: "Über uns",
    policy: "Richtlinien",
    shippingPolicy: "Versandbedingungen",
    returnPolicy: "Rückgaberichtlinien",
    warrantyPolicy: "Garantiebedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    copyright: "Urheberrecht © LIGHTINMOTION 2026.",
  },
  fr: {
    home: "ACCUEIL",
    store: "BOUTIQUE",
    app: "APPLICATION",
    searchPlaceholder: "Rechercher produits, éclairages...",
    lightinmotionCollection: "Collection LIGHTINMOTION",
    tvSyncSet: "Kit de synchronisation TV",
    monitorSyncSet: "Kit de synchronisation Écran",
    bestSelling: "MEILLEURE VENTE",
    sale: "PROMOTION",
    diwaliDeal: "Offre Spéciale Diwali",
    shopNow: "Acheter maintenant",
    tvBacklightTitle: "Rétroéclairage TV",
    monitorBacklightTitle: "Rétroéclairage Écran LightinMotion",
    lampLightTitle: "Lampe d'ambiance LightinMotion",
    monitorBarTitle: "Barres lumineuses pour écran",
    customSyncTitle: "Bandes lumineuses personnalisées",
    cloudLightsTitle: "Éclairage nuage immersif",
    subscribeEmails: "Abonnez-vous à nos e-mails",
    subscribeHeading: "Restez informé de nos produits innovants et de nos soldes exclusives.",
    enterEmail: "Entrez votre adresse e-mail...",
    thankYouSubscribe: "Merci pour votre inscription !",
    programs: "Programmes",
    affiliateProgram: "Programme d'affiliation",
    explore: "Explorer",
    officialOnlineStore: "Boutique en ligne officielle",
    onlineReseller: "Revendeur en ligne",
    aboutUs: "À propos de nous",
    policy: "Politiques",
    shippingPolicy: "Politique de livraison",
    returnPolicy: "Politique de retour",
    warrantyPolicy: "Politique de garantie",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    copyright: "Copyright © LIGHTINMOTION 2026.",
  },
  ja: {
    home: "ホーム",
    store: "ストア",
    app: "アプリ",
    searchPlaceholder: "製品、ライティングを検索...",
    lightinmotionCollection: "LIGHTINMOTION コレクション",
    tvSyncSet: "テレビ同期セット",
    monitorSyncSet: "モニター同期セット",
    bestSelling: "ベストセラー",
    sale: "セール",
    diwaliDeal: "ディワリ特別セール",
    shopNow: "今すぐ購入",
    tvBacklightTitle: "テレビ バックライト",
    monitorBacklightTitle: "LightinMotion モニター バックライト",
    lampLightTitle: "LightinMotion ランプ ライト",
    monitorBarTitle: "モニター バー ライト",
    customSyncTitle: "カスタム シンク ライト",
    cloudLightsTitle: "クラウド ライト",
    subscribeEmails: "メールマガジンに登録",
    subscribeHeading: "最新の革新的製品や限定セールの情報をお届けします。",
    enterEmail: "メールアドレスを入力...",
    thankYouSubscribe: "ご登録ありがとうございます！",
    programs: "プログラム",
    affiliateProgram: "アフィリエイト プログラム",
    explore: "製品情報",
    officialOnlineStore: "公式オンラインストア",
    onlineReseller: "正規販売店",
    aboutUs: "ブランドについて",
    policy: "ポリシー",
    shippingPolicy: "配送ポリシー",
    returnPolicy: "返品ポリシー",
    warrantyPolicy: "保証ポリシー",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    copyright: "著作権 © LIGHTINMOTION 2026.",
  },
};

interface LocalizationContextType {
  currency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  language: LanguageConfig;
  setLanguage: (code: LanguageCode) => void;
  formatPrice: (amountInINR: number) => string;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>("USD_IN");
  const [languageCode, setLanguageCode] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem("lim_currency") as CurrencyCode;
      if (savedCurrency && CURRENCIES[savedCurrency]) {
        setCurrencyCode(savedCurrency);
      }
      const savedLanguage = localStorage.getItem("lim_language") as LanguageCode;
      if (savedLanguage && LANGUAGES[savedLanguage]) {
        setLanguageCode(savedLanguage);
      }
    } catch {
      // LocalStorage not available or blocked
    }
  }, []);

  const handleSetCurrency = (code: CurrencyCode) => {
    setCurrencyCode(code);
    try {
      localStorage.setItem("lim_currency", code);
    } catch {}
  };

  const handleSetLanguage = (code: LanguageCode) => {
    setLanguageCode(code);
    try {
      localStorage.setItem("lim_language", code);
    } catch {}
  };

  const currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.USD_IN;
  const currentLanguage = LANGUAGES[languageCode] || LANGUAGES.en;

  const formatPrice = (amountInINR: number): string => {
    const converted = amountInINR * currentCurrency.rate;
    if (currentCurrency.code === "INR") {
      return `${currentCurrency.symbol} ${converted.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[languageCode] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LocalizationContext.Provider
      value={{
        currency: currentCurrency,
        setCurrency: handleSetCurrency,
        language: currentLanguage,
        setLanguage: handleSetLanguage,
        formatPrice,
        t,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};
