export interface Country {
  code: string;
  name: string;
  /** International dialing code, without the "+". */
  dialCode: string;
}

/** ISO 3166-1 alpha-2 codes, sorted by Arabic name. Optional at sign-up; also sets the phone prefix. */
export const countries: Country[] = [
  { code: "JO", name: "الأردن", dialCode: "962" },
  { code: "AE", name: "الإمارات", dialCode: "971" },
  { code: "BH", name: "البحرين", dialCode: "973" },
  { code: "TN", name: "تونس", dialCode: "216" },
  { code: "DZ", name: "الجزائر", dialCode: "213" },
  { code: "KM", name: "جزر القمر", dialCode: "269" },
  { code: "DJ", name: "جيبوتي", dialCode: "253" },
  { code: "SA", name: "السعودية", dialCode: "966" },
  { code: "SD", name: "السودان", dialCode: "249" },
  { code: "SY", name: "سوريا", dialCode: "963" },
  { code: "SO", name: "الصومال", dialCode: "252" },
  { code: "IQ", name: "العراق", dialCode: "964" },
  { code: "OM", name: "عُمان", dialCode: "968" },
  { code: "PS", name: "فلسطين", dialCode: "970" },
  { code: "QA", name: "قطر", dialCode: "974" },
  { code: "KW", name: "الكويت", dialCode: "965" },
  { code: "LB", name: "لبنان", dialCode: "961" },
  { code: "LY", name: "ليبيا", dialCode: "218" },
  { code: "EG", name: "مصر", dialCode: "20" },
  { code: "MA", name: "المغرب", dialCode: "212" },
  { code: "MR", name: "موريتانيا", dialCode: "222" },
  { code: "YE", name: "اليمن", dialCode: "967" },
];

export function dialCodeOf(countryCode: string | null | undefined): string | undefined {
  return countries.find((country) => country.code === countryCode)?.dialCode;
}
