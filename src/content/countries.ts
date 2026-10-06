export interface Country {
  code: string;
  name: string;
  nameEn: string;
  /** International dialing code, without the "+". */
  dialCode: string;
}

/** ISO 3166-1 alpha-2 codes, sorted by Arabic name (English lists re-sort by `nameEn`). Optional at sign-up; also sets the phone prefix. */
export const countries: Country[] = [
  { code: "JO", name: "الأردن", nameEn: "Jordan", dialCode: "962" },
  { code: "AE", name: "الإمارات", nameEn: "United Arab Emirates", dialCode: "971" },
  { code: "BH", name: "البحرين", nameEn: "Bahrain", dialCode: "973" },
  { code: "TN", name: "تونس", nameEn: "Tunisia", dialCode: "216" },
  { code: "DZ", name: "الجزائر", nameEn: "Algeria", dialCode: "213" },
  { code: "KM", name: "جزر القمر", nameEn: "Comoros", dialCode: "269" },
  { code: "DJ", name: "جيبوتي", nameEn: "Djibouti", dialCode: "253" },
  { code: "SA", name: "السعودية", nameEn: "Saudi Arabia", dialCode: "966" },
  { code: "SD", name: "السودان", nameEn: "Sudan", dialCode: "249" },
  { code: "SY", name: "سوريا", nameEn: "Syria", dialCode: "963" },
  { code: "SO", name: "الصومال", nameEn: "Somalia", dialCode: "252" },
  { code: "IQ", name: "العراق", nameEn: "Iraq", dialCode: "964" },
  { code: "OM", name: "عُمان", nameEn: "Oman", dialCode: "968" },
  { code: "PS", name: "فلسطين", nameEn: "Palestine", dialCode: "970" },
  { code: "QA", name: "قطر", nameEn: "Qatar", dialCode: "974" },
  { code: "KW", name: "الكويت", nameEn: "Kuwait", dialCode: "965" },
  { code: "LB", name: "لبنان", nameEn: "Lebanon", dialCode: "961" },
  { code: "LY", name: "ليبيا", nameEn: "Libya", dialCode: "218" },
  { code: "EG", name: "مصر", nameEn: "Egypt", dialCode: "20" },
  { code: "MA", name: "المغرب", nameEn: "Morocco", dialCode: "212" },
  { code: "MR", name: "موريتانيا", nameEn: "Mauritania", dialCode: "222" },
  { code: "YE", name: "اليمن", nameEn: "Yemen", dialCode: "967" },
];

export function dialCodeOf(countryCode: string | null | undefined): string | undefined {
  return countries.find((country) => country.code === countryCode)?.dialCode;
}
