import fallbackLangData from "./locales/en.json";

export interface Language {
  code: string;
  label: string;
  rtl?: boolean;
}

export const defaultLang = { code: "en", label: "English" };

const allLanguages: Language[] = [
  { code: "vi-VN", label: "Tiếng Việt" },
].concat([defaultLang]);

export const languages: Language[] = allLanguages
  .sort((left, right) => (left.label > right.label ? 1 : -1));


let currentLang: Language = defaultLang;
let currentLangData = {};

export const setLanguage = async (lang: Language) => {
  currentLang = lang;
  document.documentElement.dir = currentLang.rtl ? "rtl" : "ltr";
  document.documentElement.lang = currentLang.code;

  currentLangData = await import(
      `./locales/${currentLang.code}.json`
  );
};

export const getLanguage = () => currentLang;

const findPartsForData = (data: any, parts: string[]) => {
  for (let index = 0; index < parts.length; ++index) {
    const part = parts[index];
    if (data[part] === undefined) {
      return undefined;
    }
    data = data[part];
  }
  if (typeof data !== "string") {
    return undefined;
  }
  return data;
};

export const t = (
  path: string,
  replacement?: { [key: string]: string | number },
) => {
  const parts = path.split(".");
  let translation =
    findPartsForData(currentLangData, parts) ||
    findPartsForData(fallbackLangData, parts);
  if (translation === undefined) {
    throw new Error(`Can't find translation for ${path}`);
  }

  if (replacement) {
    for (const key in replacement) {
      translation = translation.replace(`{{${key}}}`, String(replacement[key]));
    }
  }
  return translation;
};
