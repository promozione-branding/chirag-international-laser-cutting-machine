/*
  Product catalogue data for the Machines page.
  Names, prices and specifications are transcribed from the four
  Chirag International category pages. Images live in /public/machines/.
*/

export const SOURCE_URLS = {
  marking: "https://www.chiragint.in/laser-marking-machine.html",
  engraving: "https://www.chiragint.in/laser-engraving-machine.html",
  fiber: "https://www.chiragint.in/fiber-laser-cutting-machine.html",
  cutting: "https://www.chiragint.in/laser-cutting-machine.html",
};

export const categories = [
  { id: "all", label: "All Products" },
  { id: "cutting", label: "Laser Cutting Machines" },
  { id: "fiber", label: "Fiber Laser Cutting" },
  { id: "engraving", label: "Laser Engraving Machines" },
  { id: "marking", label: "Laser Marking Machines" },
];

export const products = [
  // LASER CUTTING MACHINES
  {
    id: "co2-leather-cutter",
    name: "CO2 Laser Leather Cutting Machine",
    category: "cutting",
    categoryLabel: "CO2 Laser Cutting",
    price: 310000,
    priceUnit: "Piece",
    image: "/machines/co2-laser-leather-cutting-machine.png",
    description:
      "Industrial CO2 laser cutting for leather and a range of non-metal materials.",
    specs: ["100 W laser power", "8000 mm/s cutting speed", "CI 1490T model"],
    tags: ["CO2 Laser", "Industrial", "Non-metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "fiber-steel-cutter",
    name: "Fiber Laser Steel Cutting Machine",
    category: "cutting",
    categoryLabel: "Fiber Laser Cutting",
    price: 2500000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-steel-cutting-machine.png",
    // Optional: plays on card hover. Omit the field for products without a video.
    video: "/Laser_cutting_stainless_steel_sheet_189e6c00.mp4",
    description:
      "Automatic fiber laser system for precision cutting of steel sheets.",
    specs: [
      "3000 × 1500 mm working area",
      "2 kW capacity",
      "SS cutting up to 8 mm",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "co2-laser-cutter",
    name: "CO2 Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "CO2 Laser Cutting",
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/co2-laser-cutting-machine.png",
    description:
      "CO2 laser cutting machine for industrial cutting applications.",
    specs: ["60 W laser power", "Water-cooled system", "220–240 V"],
    tags: ["CO2 Laser", "Industrial", "Non-metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "gold-silver-cutter",
    name: "Gold & Silver Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "Jewellery Cutting",
    price: 250000,
    priceUnit: "Piece",
    image: "/machines/gold-silver-laser-cutting-machine.png",
    description:
      "Laser cutting solution designed for gold and silver jewellery work.",
    specs: ["50 W power", "19 gauge capacity", "Made in India"],
    tags: ["Fiber Laser", "Jewellery", "Metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "engraving-laser-cutter-6040",
    name: "Engraving Laser Machine CI-6040",
    category: "cutting",
    categoryLabel: "Laser Engraving & Cutting",
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/ci-6040-engraving-laser-machine.png",
    description:
      "Compact laser engraving machine with water cooling and flexible file support.",
    specs: [
      "CI-6040 model",
      "0–64 m/min engraving speed",
      "JPG, BMP and TIFF support",
    ],
    tags: ["Fiber Laser", "Engraving", "Automatic"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "acrylic-laser-cutter",
    name: "CO2 Acrylic Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "Acrylic Cutting",
    price: 400000,
    priceUnit: "Piece",
    image: "/machines/acrylic-laser-cutting-machine.png",
    description:
      "CNC laser cutter for acrylic, paper, MDF, plastic, rexine and leather.",
    specs: ["100 W laser power", "CI 1490T model", "CNC control"],
    tags: ["CO2 Laser", "CNC", "Non-metal"],
    source: SOURCE_URLS.cutting,
  },

  // FIBER LASER CUTTING MACHINES
  {
    id: "fiber-laser-1000w",
    name: "Fiber Laser Cutting Machine – 1000 W",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 1800000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-1000w.png",
    description:
      "Automatic fiber laser sheet cutting machine for industrial metal processing.",
    specs: [
      "1000 W laser power",
      "3000 × 1500 mm working area",
      "1–12 kW capacity range",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-3000w",
    name: "3000 W Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 3200000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-3000w.png",
    description:
      "Combined sheet and tube fiber laser cutting machine for production environments.",
    specs: [
      "3000 W laser power",
      "4000 × 2000 mm working area",
      "100–120 m/min cutting speed",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-15kw",
    name: "1.5 kW Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 310000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-1-5kw.png",
    description:
      "Open-type fiber laser cutting system with Raycus source and CNC automation.",
    specs: [
      "1.5 kW laser power",
      "1500 × 3000 mm working area",
      "Raycus laser source",
    ],
    tags: ["Fiber Laser", "CNC", "Metal"],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-3kw-max",
    name: "3 kW Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 2200000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-3kw.png",
    description:
      "Open-type fiber laser cutting system with MAX source for metal fabrication.",
    specs: [
      "3 kW laser power",
      "1500 × 3000 mm working area",
      "MAX laser source",
    ],
    tags: ["Fiber Laser", "CNC", "Metal"],
    source: SOURCE_URLS.fiber,
  },

  // LASER ENGRAVING MACHINES
  {
    id: "laser-engraving-equipment",
    name: "Laser Engraving Equipment",
    category: "engraving",
    categoryLabel: "Fiber Laser Engraving",
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/laser-engraving-equipment.png",
    description:
      "Fiber laser engraving and marking equipment for metals and hard plastics.",
    specs: [
      "30 W laser power",
      "200 × 200 mm marking area",
      "7000 mm/s marking speed capacity",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "double-head-co2-engraver",
    name: "Double Head CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 380000,
    priceUnit: "Unit",
    image: "/machines/double-head-co2-laser-engraving-machine.png",
    description:
      "Dual-head CO2 engraving machine for efficient engraving and customization.",
    specs: ["100 W laser power", "1000 mm/s engraving speed", "CI-1390T model"],
    tags: ["CO2 Laser", "Water Cooling", "Dual Head"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "co2-engraver-1490t",
    name: "CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 270000,
    priceUnit: "Unit",
    image: "/machines/co2-laser-engraving-machine.png",
    description:
      "CO2 laser engraving machine with water cooling and mild-steel body construction.",
    specs: ["100 W laser power", "500 mm/s engraving speed", "CI 1490T model"],
    tags: ["CO2 Laser", "Water Cooling", "Automatic"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "single-head-co2-engraver",
    name: "Single Head CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 220000,
    priceUnit: "Unit",
    image: "/machines/single-head-co2-laser-engraving-machine.png",
    description:
      "Single-head CO2 engraving machine for workshop and production use.",
    specs: [
      "80 W / 100 W laser power",
      "500 mm/s engraving speed",
      "CI-6040A model",
    ],
    tags: ["CO2 Laser", "Water Cooling", "Single Head"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "automatic-co2-engraver",
    name: "Automatic CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 380000,
    priceUnit: "Unit",
    image: "/machines/automatic-co2-laser-engraving-machine.png",
    description:
      "Automatic CO2 laser engraving machine with water cooling and CNC-ready operation.",
    specs: ["100 W laser power", "500 mm/s engraving speed", "CI-9060T model"],
    tags: ["CO2 Laser", "Automatic", "Water Cooling"],
    source: SOURCE_URLS.engraving,
  },

  // LASER MARKING MACHINES
  {
    id: "metal-laser-marker-f50",
    name: "Metal Laser Marking Machine",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    price: 570000,
    priceUnit: "Unit",
    image: "/machines/metal-laser-marking-machine.png",
    description:
      "Automatic fiber laser marking machine for clear, high-speed metal marking.",
    specs: ["50 W laser power", "175 × 175 mm marking area", "CI-F50 model"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "co2-laser-marker",
    name: "CO2 Laser Marking Machine",
    category: "marking",
    categoryLabel: "CO2 Laser Marking",
    price: 450000,
    priceUnit: "Unit",
    image: "/machines/co2-laser-marking-machine.png",
    description:
      "CO2 laser marking system listed for wood marking and engraving applications.",
    specs: ["100 W power", "400 × 400 mm marking area", "Air cooling"],
    tags: ["CO2 Laser", "Wood", "Air Cooling"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "automatic-metal-marker",
    name: "Automatic Metal Laser Marking Machine",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    price: 190000,
    priceUnit: "Piece",
    image: "/machines/automatic-metal-laser-marking-machine.png",
    description:
      "Automatic metal marking system for repeatable marking applications.",
    specs: ["CI-30W model", "7000 mm/s marking speed", "Air cooling"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "laser-stamp-machine",
    name: "Laser Stamp Machine",
    category: "marking",
    categoryLabel: "Laser Marking",
    price: 170000,
    priceUnit: "Piece",
    image: "/machines/laser-stamp-machine.png",
    description:
      "Electric laser stamping machine for number marking applications.",
    specs: ["20 W power", "220 V", "Electric operation"],
    tags: ["Fiber Laser", "Number Marking", "Electric"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "fiber-laser-marker",
    name: "Fiber Laser Marker",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    price: 175000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-marker.png",
    description:
      "Fiber laser marker for metal marking with an air-cooled configuration.",
    specs: ["30 W power", "175 × 175 mm marking area", "1064 nm wavelength"],
    tags: ["Fiber Laser", "Air Cooling", "Metal"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "jewellery-hallmarking-machine",
    name: "Jewellery Laser Hallmarking Machine",
    category: "marking",
    categoryLabel: "Jewellery Marking",
    price: 170000,
    priceUnit: "Unit",
    image: "/machines/jewellery-laser-hallmarking-machine.png",
    description:
      "Portable jewellery marking system for detailed hallmarking applications.",
    specs: [
      "20 W laser power",
      "8000 mm/s marking speed capacity",
      "CI RFL-20W model",
    ],
    tags: ["Fiber Laser", "Jewellery", "Air Cooling"],
    source: SOURCE_URLS.marking,
  },
];

export const featureFilters = [
  "Fiber Laser",
  "CO2 Laser",
  "Automatic",
  "Metal",
  "Non-metal",
  "Jewellery",
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);