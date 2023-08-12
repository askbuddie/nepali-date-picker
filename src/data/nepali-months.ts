export default [
  { "en": "Baisakh", "np": "बैशाख", "ad": "Apr/May" },
  { "en": "Jestha", "np": "जेठ", "ad": "May/Jun" },
  { "en": "Ashad", "np": "असार", "ad": "Jun/Jul" },
  { "en": "Shrawn", "np": "श्रावण", "ad": "Jul/Aug" },
  { "en": "Bhadra", "np": "भदौ", "ad": "Aug/Sep" },
  { "en": "Ashoj", "np": "आश्विन", "ad": "Sep/Oct" },
  { "en": "Kartik", "np": "कार्तिक", "ad": "Oct/Nov" },
  { "en": "Mangshir", "np": "मंसिर", "ad": "Nov/Dec" },
  { "en": "Paush", "np": "पुष", "ad": "Dec/Jan" },
  { "en": "Magh", "np": "माघ", "ad": "Jan/Feb" },
  { "en": "Falgun", "np": "फाल्गुन", "ad": "Feb/Mar" },
  { "en": "Chaitra", "np": "चैत्र", "ad": "Mar/Apr" }
] as ReadonlyArray<Month>;

type Month = { "en": string, "np": string, "ad": string };