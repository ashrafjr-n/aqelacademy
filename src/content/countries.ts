export interface Country {
  code: string;
  name: string;
}

/** ISO 3166-1 alpha-2 codes, sorted by Arabic name. Optional at sign-up. */
export const countries: Country[] = [
  { code: "JO", name: "الأردن" },
  { code: "AE", name: "الإمارات" },
  { code: "BH", name: "البحرين" },
  { code: "TN", name: "تونس" },
  { code: "DZ", name: "الجزائر" },
  { code: "KM", name: "جزر القمر" },
  { code: "DJ", name: "جيبوتي" },
  { code: "SA", name: "السعودية" },
  { code: "SD", name: "السودان" },
  { code: "SY", name: "سوريا" },
  { code: "SO", name: "الصومال" },
  { code: "IQ", name: "العراق" },
  { code: "OM", name: "عُمان" },
  { code: "PS", name: "فلسطين" },
  { code: "QA", name: "قطر" },
  { code: "KW", name: "الكويت" },
  { code: "LB", name: "لبنان" },
  { code: "LY", name: "ليبيا" },
  { code: "EG", name: "مصر" },
  { code: "MA", name: "المغرب" },
  { code: "MR", name: "موريتانيا" },
  { code: "YE", name: "اليمن" },
];
