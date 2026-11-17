/*
  Product catalogue data – single source of truth for BOTH the Products
  listing page and every Product Detail page (/products/[slug]).

  Every product below carries the same set of fields, and the detail page
  renders purely from them:

    id / slug        URL segment → /products/<slug>
    name, badge      Title and the small category pill
    model            Model number (null when not published)
    price, priceUnit Shown as "₹ 25,00,000 / Piece"
    image, gallery   Main image + thumbnails  [{ src, alt }]
    video            Overview video (null → image only, no play button)
    summary          Short paragraph beside the gallery
    overview         Paragraph in the "Product Overview" section
    highlights       4 icon chips under the overview   [{ icon, label }]
    quickSpecs       4 icon rows under the summary      [{ icon, label }]
    specifications   Technical table rows              [{ parameter, value }]
    features         6 cards                           [{ icon, title, text }]
    applications     5 image cards                     [{ name, image, icon }]
    faqs             Accordion                         [{ q, a }]
    brochure         PDF path for "Download Brochure"
    related          ids of related products

  Icon names are mapped in components/product/icons.js.
  Images live in /public/machines/, application photos in
  /public/applications/, brochures in /public/brochures/.

  Names, prices and core specifications are transcribed from the four
  Chirag International category pages.
*/

export const SOURCE_URLS = {
  marking: "https://www.chiragint.in/laser-marking-machine.html",
  engraving: "https://www.chiragint.in/laser-engraving-machine.html",
  fiber: "https://www.chiragint.in/fiber-laser-cutting-machine.html",
  cutting: "https://www.chiragint.in/laser-cutting-machine.html",
};

export const categories = [
  {
    id: "all",
    label: "All Products",
  },
  {
    id: "cutting",
    label: "Laser Cutting Machines",
  },
  {
    id: "fiber",
    label: "Fiber Laser Cutting",
  },
  {
    id: "engraving",
    label: "Laser Engraving Machines",
  },
  {
    id: "marking",
    label: "Laser Marking Machines",
  },
];

export const products = [
  {
    id: "co2-leather-cutter",
    slug: "co2-leather-cutter",
    name: "CO2 Laser Leather Cutting Machine",
    category: "cutting",
    categoryLabel: "CO2 Laser Cutting",
    badge: "CO2 Cutting",
    model: "CI 1490T",
    price: 310000,
    priceUnit: "Piece",
    image: "/machines/co2-laser-leather-cutting-machine.png",
    gallery: [
      {
        src: "/machines/co2-laser-leather-cutting-machine.png",
        alt: "CO2 Laser Leather Cutting Machine – view 1",
      },
      {
        src: "/machines/co2-leather-cutting_transparent.png",
        alt: "CO2 Laser Leather Cutting Machine – view 2",
      },
    ],
    video: null,
    videoPoster: "/machines/co2-laser-leather-cutting-machine.png",
    description: "Industrial CO2 laser cutting for leather and a range of non-metal materials.",
    summary: "Industrial CO2 laser cutting machine for fast, clean cutting of leather and a wide range of non-metal materials.",
    overview: "The CO2 Laser Leather Cutting Machine is a high-performance CNC cutting solution built for leather, fabric and other non-metal materials. It delivers clean edges at high speed, making it ideal for footwear, garment, bag and accessory manufacturing.",
    specs: ["100 W laser power", "8000 mm/s cutting speed", "CI 1490T model"],
    tags: ["CO2 Laser", "Industrial", "Non-metal"],
    highlights: [
      { icon: "crosshair", label: "Clean Edges" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 100 W" },
      { icon: "gauge", label: "Cutting Speed: 8000 mm/s" },
      { icon: "settings", label: "Model: CI 1490T" },
      { icon: "layers", label: "Materials: Leather & non-metals" },
    ],
    specifications: [
      { parameter: "Model", value: "CI 1490T" },
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "100 W" },
      { parameter: "Cutting Speed", value: "8000 mm/s" },
      { parameter: "Suitable Materials", value: "Leather and other non-metal materials" },
      { parameter: "Application", value: "Industrial cutting" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Quick turnaround with consistent accuracy.",
      },
      {
        icon: "layers",
        title: "Non-Metal Versatility",
        text: "Cuts acrylic, MDF, leather, fabric, paper and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple controller with easy file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build designed for daily production use.",
      },
      {
        icon: "target",
        title: "Precise & Clean Edges",
        text: "Smooth, polished edges with minimal finishing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Acrylic Signage", image: "/applications/acrylic-signage.jpg", icon: "monitor" },
      { name: "Leather & Footwear", image: "/applications/leather-footwear.jpg", icon: "shirt" },
      { name: "Wood & MDF Crafts", image: "/applications/wood-mdf-crafts.jpg", icon: "tree" },
      { name: "Textile & Fabric", image: "/applications/textile-fabric.jpg", icon: "scissors" },
      { name: "Gifts & Packaging", image: "/applications/gifts-packaging.jpg", icon: "gift" },
    ],
    faqs: [
      {
        q: "Which materials can the CO2 Laser Leather Cutting Machine cut?",
        a: "It is designed for leather, fabric, rexine and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI 1490T; Laser Source: CO2 Laser; Laser Power: 100 W; Cutting Speed: 8000 mm/s. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 3,10,000 INR per piece.",
      },
    ],
    brochure: "/brochures/co2-leather-cutter.pdf",
    related: [
      "co2-laser-cutter",
      "acrylic-laser-cutter",
      "engraving-laser-cutter-6040",
      "gold-silver-cutter",
    ],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "fiber-steel-cutter",
    slug: "fiber-steel-cutter",
    name: "Fiber Laser Steel Cutting Machine",
    category: "cutting",
    categoryLabel: "Fiber Laser Cutting",
    badge: "Fiber Cutting",
    model: "CI-FL3015",
    price: 2500000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-steel-cutting-machine.png",
    gallery: [
      {
        src: "/machines/fiber-laser-steel-cutting-machine.png",
        alt: "Fiber Laser Steel Cutting Machine – view 1",
      },
      {
        src: "/machines/fiber-laser-steel.png",
        alt: "Fiber Laser Steel Cutting Machine – view 2",
      },
      {
        src: "/machines/fiber-laser-steel_transparent.png",
        alt: "Fiber Laser Steel Cutting Machine – view 3",
      },
      {
        src: "/machines/fiber-laser-cutting.jpg",
        alt: "Fiber Laser Steel Cutting Machine – view 4",
      },
      {
        src: "/machines/fiber-laser-cutters_transparent.png",
        alt: "Fiber Laser Steel Cutting Machine – view 5",
      },
    ],
    video: "/Laser_cutting_stainless_steel_sheet_189e6c00.mp4",
    videoPoster: "/machines/fiber-laser-steel-cutting-machine.png",
    description: "Automatic fiber laser system for precision cutting of steel sheets.",
    summary: "High-precision fiber laser cutting machine designed for fast, accurate and efficient cutting of mild steel, stainless steel and other metals.",
    overview: "The Fiber Laser Steel Cutting Machine is a high-performance, CNC-based laser cutting solution for precision metal fabrication. It delivers clean, accurate and high-speed cutting with minimal maintenance, making it ideal for industrial and commercial applications.",
    specs: [
      "3000 × 1500 mm working area",
      "1.5–3 kW laser power (optional)",
      "SS cutting up to 8 mm",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    highlights: [
      { icon: "crosshair", label: "High Precision" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "ruler", label: "Working Area: 3000 × 1500 mm" },
      { icon: "settings", label: "Fully Automatic Operation" },
      { icon: "layers", label: "Max Cutting Thickness: SS 8 mm" },
      { icon: "zap", label: "Laser Power: 1.5 – 3 kW (Optional)" },
    ],
    specifications: [
      { parameter: "Model", value: "CI-FL3015" },
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Working Area", value: "3000 × 1500 mm" },
      { parameter: "Laser Power", value: "1.5 kW – 3 kW (Optional)" },
      { parameter: "Max Cutting Thickness", value: "MS: 12 mm  |  SS: 8 mm  |  Al: 6 mm" },
      { parameter: "Positioning Accuracy", value: "±0.03 mm" },
      { parameter: "Repeat Positioning Accuracy", value: "±0.02 mm" },
      { parameter: "Control System", value: "CNC (User-Friendly Interface)" },
      { parameter: "Power Supply", value: "Three Phase, 380V / 50Hz" },
      { parameter: "Machine Dimension", value: "4500 × 2300 × 1800 mm (Approx.)" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Faster production with excellent accuracy.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Suitable for MS, SS, Aluminum, Brass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Advanced CNC with easy operation.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "target",
        title: "Precise & Clean Cuts",
        text: "Smooth edges with minimal post-processing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Metal Fabrication",
        image: "/applications/metal-fabrication.jpg",
        icon: "factory",
      },
      { name: "Sheet Metal Work", image: "/applications/sheet-metal-work.jpg", icon: "layers" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
      { name: "Automotive Parts", image: "/applications/automotive-parts.jpg", icon: "cog" },
      {
        name: "Industrial Equipment",
        image: "/applications/industrial-equipment.jpg",
        icon: "wrench",
      },
    ],
    faqs: [
      {
        q: "Which materials can the Fiber Laser Steel Cutting Machine cut?",
        a: "It is designed for mild steel, stainless steel, aluminium, brass and other metals. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI-FL3015; Laser Source: Fiber Laser; Working Area: 3000 × 1500 mm; Laser Power: 1.5 kW – 3 kW (Optional). The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 25,00,000 INR per piece.",
      },
    ],
    brochure: "/brochures/fiber-steel-cutter.pdf",
    related: [
      "co2-engraver-1490t",
      "fiber-laser-marker",
      "laser-engraving-equipment",
      "fiber-laser-3000w",
    ],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "co2-laser-cutter",
    slug: "co2-laser-cutter",
    name: "CO2 Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "CO2 Laser Cutting",
    badge: "CO2 Cutting",
    model: null,
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/co2-laser-cutting-machine.png",
    gallery: [
      {
        src: "/machines/co2-laser-cutting-machine.png",
        alt: "CO2 Laser Cutting Machine – view 1",
      },
      { src: "/machines/co2-laser-cutting.jpg", alt: "CO2 Laser Cutting Machine – view 2" },
      {
        src: "/machines/co2-laser-cutting__transparent.jpg",
        alt: "CO2 Laser Cutting Machine – view 3",
      },
    ],
    video: null,
    videoPoster: "/machines/co2-laser-cutting-machine.png",
    description: "CO2 laser cutting machine for industrial cutting applications.",
    summary: "Water-cooled CO2 laser cutting machine for dependable industrial cutting of non-metal materials.",
    overview: "The CO2 Laser Cutting Machine is a 60 W water-cooled system designed for industrial cutting applications. It offers stable output, clean edges and straightforward operation for workshops and production units.",
    specs: ["60 W laser power", "Water-cooled system", "220–240 V"],
    tags: ["CO2 Laser", "Industrial", "Non-metal"],
    highlights: [
      { icon: "crosshair", label: "Clean Edges" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 60 W" },
      { icon: "droplets", label: "Water-Cooled System" },
      { icon: "plug", label: "Supply: 220–240 V" },
      { icon: "layers", label: "Materials: Non-metals" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "60 W" },
      { parameter: "Cooling", value: "Water-cooled system" },
      { parameter: "Voltage", value: "220–240 V" },
      { parameter: "Suitable Materials", value: "Non-metal materials" },
      { parameter: "Application", value: "Industrial cutting" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Quick turnaround with consistent accuracy.",
      },
      {
        icon: "layers",
        title: "Non-Metal Versatility",
        text: "Cuts acrylic, MDF, leather, fabric, paper and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple controller with easy file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build designed for daily production use.",
      },
      {
        icon: "target",
        title: "Precise & Clean Edges",
        text: "Smooth, polished edges with minimal finishing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Acrylic Signage", image: "/applications/acrylic-signage.jpg", icon: "monitor" },
      { name: "Leather & Footwear", image: "/applications/leather-footwear.jpg", icon: "shirt" },
      { name: "Wood & MDF Crafts", image: "/applications/wood-mdf-crafts.jpg", icon: "tree" },
      { name: "Textile & Fabric", image: "/applications/textile-fabric.jpg", icon: "scissors" },
      { name: "Gifts & Packaging", image: "/applications/gifts-packaging.jpg", icon: "gift" },
    ],
    faqs: [
      {
        q: "Which materials can the CO2 Laser Cutting Machine cut?",
        a: "It is designed for acrylic, wood, MDF, leather, fabric and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: CO2 Laser; Laser Power: 60 W; Cooling: Water-cooled system; Voltage: 220–240 V. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 2,20,000 INR per piece.",
      },
    ],
    brochure: "/brochures/co2-laser-cutter.pdf",
    related: [
      "acrylic-laser-cutter",
      "co2-leather-cutter",
      "engraving-laser-cutter-6040",
      "gold-silver-cutter",
    ],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "gold-silver-cutter",
    slug: "gold-silver-cutter",
    name: "Gold & Silver Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "Jewellery Cutting",
    badge: "Jewellery Cutting",
    model: null,
    price: 250000,
    priceUnit: "Piece",
    image: "/machines/gold-silver-laser-cutting-machine.png",
    gallery: [
      {
        src: "/machines/gold-silver-laser-cutting-machine.png",
        alt: "Gold & Silver Laser Cutting Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/gold-silver-laser-cutting-machine.png",
    description: "Laser cutting solution designed for gold and silver jewellery work.",
    summary: "Compact laser cutting solution designed for precise gold and silver jewellery work, made in India.",
    overview: "The Gold & Silver Laser Cutting Machine is purpose-built for jewellery manufacturers. With 50 W power and capacity up to 19 gauge, it cuts intricate designs with clean edges and very little material waste.",
    specs: ["50 W power", "19 gauge capacity", "Made in India"],
    tags: ["Fiber Laser", "Jewellery", "Metal"],
    highlights: [
      { icon: "crosshair", label: "Fine Precision" },
      { icon: "gem", label: "Jewellery Ready" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 50 W" },
      { icon: "layers", label: "Capacity: Up to 19 gauge" },
      { icon: "gem", label: "Gold & Silver Cutting" },
      { icon: "settings", label: "Made in India" },
    ],
    specifications: [
      { parameter: "Laser Power", value: "50 W" },
      { parameter: "Cutting Capacity", value: "19 gauge" },
      { parameter: "Suitable Materials", value: "Gold and silver" },
      { parameter: "Application", value: "Jewellery cutting" },
      { parameter: "Origin", value: "Made in India" },
    ],
    features: [
      {
        icon: "target",
        title: "Fine Detail Cutting",
        text: "Intricate designs cut with excellent accuracy.",
      },
      {
        icon: "gem",
        title: "Gold & Silver Ready",
        text: "Designed for precious-metal jewellery work.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple operation for workshop teams.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust build for long-term performance.",
      },
      { icon: "zap", title: "Fast Turnaround", text: "Quicker production of repeat designs." },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Gold Cutting", image: "/applications/gold-cutting.jpg", icon: "gem" },
      { name: "Silver Cutting", image: "/applications/silver-cutting.jpg", icon: "sparkles" },
      { name: "Custom Jewellery", image: "/applications/custom-jewellery.jpg", icon: "gem" },
      { name: "Pendants & Charms", image: "/applications/pendants-charms.jpg", icon: "tag" },
      {
        name: "Jewellery Workshops",
        image: "/applications/jewellery-workshops.jpg",
        icon: "factory",
      },
    ],
    faqs: [
      {
        q: "Which materials can the Gold & Silver Laser Cutting Machine cut?",
        a: "It is designed for gold, silver and other precious-metal sheet up to 19 gauge. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Power: 50 W; Cutting Capacity: 19 gauge; Suitable Materials: Gold and silver; Origin: Made in India. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 2,50,000 INR per piece.",
      },
    ],
    brochure: "/brochures/gold-silver-cutter.pdf",
    related: [
      "jewellery-hallmarking-machine",
      "fiber-laser-marker",
      "co2-laser-cutter",
      "laser-engraving-equipment",
    ],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "engraving-laser-cutter-6040",
    slug: "engraving-laser-cutter-6040",
    name: "Engraving Laser Machine CI-6040",
    category: "cutting",
    categoryLabel: "Laser Engraving & Cutting",
    badge: "Engraving & Cutting",
    model: "CI-6040",
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/ci-6040-engraving-laser-machine.png",
    gallery: [
      {
        src: "/machines/ci-6040-engraving-laser-machine.png",
        alt: "Engraving Laser Machine CI-6040 – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/ci-6040-engraving-laser-machine.png",
    description: "Compact laser engraving machine with water cooling and flexible file support.",
    summary: "Compact water-cooled laser engraving machine with flexible image-file support for workshops and small businesses.",
    overview: "The CI-6040 Engraving Laser Machine is a compact system that combines fast engraving with simple operation. Water cooling keeps output stable, and support for common image formats makes job preparation quick and easy.",
    specs: [
      "CI-6040 model",
      "0–64 m/min engraving speed",
      "JPG, BMP and TIFF support",
    ],
    tags: ["Fiber Laser", "Engraving", "Automatic"],
    highlights: [
      { icon: "crosshair", label: "Fine Detail" },
      { icon: "rocket", label: "Fast Engraving" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "settings", label: "Model: CI-6040" },
      { icon: "gauge", label: "Engraving Speed: 0–64 m/min" },
      { icon: "layers", label: "Files: JPG, BMP, TIFF" },
      { icon: "droplets", label: "Water-Cooled Operation" },
    ],
    specifications: [
      { parameter: "Model", value: "CI-6040" },
      { parameter: "Engraving Speed", value: "0–64 m/min" },
      { parameter: "Supported File Formats", value: "JPG, BMP and TIFF" },
      { parameter: "Cooling", value: "Water cooling" },
      { parameter: "Application", value: "Laser engraving and cutting" },
    ],
    features: [
      {
        icon: "zap",
        title: "Fast Engraving",
        text: "High-speed engraving with consistent depth.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Works across wood, acrylic, leather, glass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Easy software and file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build for daily workshop use.",
      },
      {
        icon: "target",
        title: "Crisp, Permanent Results",
        text: "Sharp detail on logos, text and artwork.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Awards & Trophies", image: "/applications/awards-trophies.jpg", icon: "trophy" },
      {
        name: "Wood & Acrylic Crafts",
        image: "/applications/wood-acrylic-crafts.jpg",
        icon: "tree",
      },
      {
        name: "Personalised Gifts",
        image: "/applications/personalised-gifts.jpg",
        icon: "gift",
      },
      { name: "Stamps & Seals", image: "/applications/stamps-seals.jpg", icon: "stamp" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
    ],
    faqs: [
      {
        q: "Which materials can the Engraving Laser Machine CI-6040 engrave?",
        a: "It is designed for wood, acrylic, leather, MDF and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI-6040; Engraving Speed: 0–64 m/min; Supported File Formats: JPG, BMP and TIFF; Cooling: Water cooling. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right engraving configuration along with pricing. The listed price is 2,20,000 INR per piece.",
      },
    ],
    brochure: "/brochures/engraving-laser-cutter-6040.pdf",
    related: [
      "single-head-co2-engraver",
      "co2-engraver-1490t",
      "automatic-co2-engraver",
      "co2-laser-cutter",
    ],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "acrylic-laser-cutter",
    slug: "acrylic-laser-cutter",
    name: "CO2 Acrylic Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "Acrylic Cutting",
    badge: "Acrylic Cutting",
    model: "CI 1490T",
    price: 400000,
    priceUnit: "Piece",
    image: "/machines/acrylic-laser-cutting-machine.png",
    gallery: [
      {
        src: "/machines/acrylic-laser-cutting-machine.png",
        alt: "CO2 Acrylic Laser Cutting Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/acrylic-laser-cutting-machine.png",
    description: "CNC laser cutter for acrylic, paper, MDF, plastic, rexine and leather.",
    summary: "CNC CO2 laser cutter for acrylic, paper, MDF, plastic, rexine and leather.",
    overview: "The CO2 Acrylic Laser Cutting Machine is a 100 W CNC system built for signage, display and craft production. It cuts acrylic, paper, MDF, plastic, rexine and leather with smooth, polished edges.",
    specs: ["100 W laser power", "CI 1490T model", "CNC control"],
    tags: ["CO2 Laser", "CNC", "Non-metal"],
    highlights: [
      { icon: "crosshair", label: "Clean Edges" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 100 W" },
      { icon: "settings", label: "Model: CI 1490T" },
      { icon: "cpu", label: "CNC Control" },
      { icon: "layers", label: "Acrylic, MDF, Leather & more" },
    ],
    specifications: [
      { parameter: "Model", value: "CI 1490T" },
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "100 W" },
      { parameter: "Control System", value: "CNC" },
      {
        parameter: "Suitable Materials",
        value: "Acrylic, paper, MDF, plastic, rexine and leather",
      },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Quick turnaround with consistent accuracy.",
      },
      {
        icon: "layers",
        title: "Non-Metal Versatility",
        text: "Cuts acrylic, MDF, leather, fabric, paper and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple controller with easy file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build designed for daily production use.",
      },
      {
        icon: "target",
        title: "Precise & Clean Edges",
        text: "Smooth, polished edges with minimal finishing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Acrylic Signage", image: "/applications/acrylic-signage.jpg", icon: "monitor" },
      { name: "Leather & Footwear", image: "/applications/leather-footwear.jpg", icon: "shirt" },
      { name: "Wood & MDF Crafts", image: "/applications/wood-mdf-crafts.jpg", icon: "tree" },
      { name: "Textile & Fabric", image: "/applications/textile-fabric.jpg", icon: "scissors" },
      { name: "Gifts & Packaging", image: "/applications/gifts-packaging.jpg", icon: "gift" },
    ],
    faqs: [
      {
        q: "Which materials can the CO2 Acrylic Laser Cutting Machine cut?",
        a: "It is designed for acrylic, paper, MDF, plastic, rexine and leather. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI 1490T; Laser Source: CO2 Laser; Laser Power: 100 W; Control System: CNC. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 4,00,000 INR per piece.",
      },
    ],
    brochure: "/brochures/acrylic-laser-cutter.pdf",
    related: [
      "co2-laser-cutter",
      "co2-leather-cutter",
      "engraving-laser-cutter-6040",
      "co2-engraver-1490t",
    ],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "fiber-laser-1000w",
    slug: "fiber-laser-1000w",
    name: "Fiber Laser Cutting Machine – 1000 W",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    badge: "Fiber Cutting",
    model: null,
    price: 1800000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-1000w.png",
    gallery: [
      {
        src: "/machines/fiber-laser-cutting-machine-1000w.png",
        alt: "Fiber Laser Cutting Machine – 1000 W – view 1",
      },
    ],
    video: "/Laser_cutting_machine_cutting_metal_e77af3e2.mp4",
    videoPoster: "/machines/fiber-laser-cutting-machine-1000w.png",
    description: "Automatic fiber laser sheet cutting machine for industrial metal processing.",
    summary: "Automatic 1000 W fiber laser sheet cutting machine for industrial metal processing.",
    overview: "The 1000 W Fiber Laser Cutting Machine is an automatic sheet-cutting system for industrial metal processing. A 3000 × 1500 mm working area and CNC automation deliver accurate, repeatable cuts with low running costs.",
    specs: [
      "1000 W laser power",
      "3000 × 1500 mm working area",
      "1–12 kW capacity range",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    highlights: [
      { icon: "crosshair", label: "High Precision" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 1000 W" },
      { icon: "ruler", label: "Working Area: 3000 × 1500 mm" },
      { icon: "settings", label: "Fully Automatic Operation" },
      { icon: "gauge", label: "Capacity Range: 1–12 kW" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Laser Power", value: "1000 W" },
      { parameter: "Working Area", value: "3000 × 1500 mm" },
      { parameter: "Capacity Range", value: "1–12 kW" },
      { parameter: "Operation", value: "Automatic" },
      { parameter: "Application", value: "Industrial sheet-metal cutting" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Faster production with excellent accuracy.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Suitable for MS, SS, Aluminum, Brass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Advanced CNC with easy operation.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "target",
        title: "Precise & Clean Cuts",
        text: "Smooth edges with minimal post-processing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Metal Fabrication",
        image: "/applications/metal-fabrication.jpg",
        icon: "factory",
      },
      { name: "Sheet Metal Work", image: "/applications/sheet-metal-work.jpg", icon: "layers" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
      { name: "Automotive Parts", image: "/applications/automotive-parts.jpg", icon: "cog" },
      {
        name: "Industrial Equipment",
        image: "/applications/industrial-equipment.jpg",
        icon: "wrench",
      },
    ],
    faqs: [
      {
        q: "Which materials can the Fiber Laser Cutting Machine – 1000 W cut?",
        a: "It is designed for mild steel, stainless steel, aluminium and other sheet metals. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: Fiber Laser; Laser Power: 1000 W; Working Area: 3000 × 1500 mm; Capacity Range: 1–12 kW. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 18,00,000 INR per piece.",
      },
    ],
    brochure: "/brochures/fiber-laser-1000w.pdf",
    related: [
      "fiber-laser-15kw",
      "fiber-laser-3kw-max",
      "fiber-laser-3000w",
      "fiber-steel-cutter",
    ],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-3000w",
    slug: "fiber-laser-3000w",
    name: "3000 W Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    badge: "Fiber Cutting",
    model: null,
    price: 3200000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-3000w.png",
    gallery: [
      {
        src: "/machines/fiber-laser-cutting-machine-3000w.png",
        alt: "3000 W Fiber Laser Cutting Machine – view 1",
      },
    ],
    video: "/Laser_cutting_machine_cutting_metal_e77af3e2.mp4",
    videoPoster: "/machines/fiber-laser-cutting-machine-3000w.png",
    description: "Combined sheet and tube fiber laser cutting machine for production environments.",
    summary: "Combined sheet and tube 3000 W fiber laser cutting machine for high-volume production environments.",
    overview: "The 3000 W Fiber Laser Cutting Machine combines sheet and tube cutting in a single production-grade system. With a 4000 × 2000 mm working area and cutting speeds of 100–120 m/min, it is built for demanding fabrication shops.",
    specs: [
      "3000 W laser power",
      "4000 × 2000 mm working area",
      "100–120 m/min cutting speed",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    highlights: [
      { icon: "crosshair", label: "High Precision" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 3000 W" },
      { icon: "ruler", label: "Working Area: 4000 × 2000 mm" },
      { icon: "gauge", label: "Speed: 100–120 m/min" },
      { icon: "layers", label: "Sheet & Tube Cutting" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Laser Power", value: "3000 W" },
      { parameter: "Working Area", value: "4000 × 2000 mm" },
      { parameter: "Cutting Speed", value: "100–120 m/min" },
      { parameter: "Cutting Type", value: "Combined sheet and tube" },
      { parameter: "Application", value: "Production-scale metal fabrication" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Faster production with excellent accuracy.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Suitable for MS, SS, Aluminum, Brass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Advanced CNC with easy operation.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "target",
        title: "Precise & Clean Cuts",
        text: "Smooth edges with minimal post-processing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Metal Fabrication",
        image: "/applications/metal-fabrication.jpg",
        icon: "factory",
      },
      { name: "Sheet Metal Work", image: "/applications/sheet-metal-work.jpg", icon: "layers" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
      { name: "Automotive Parts", image: "/applications/automotive-parts.jpg", icon: "cog" },
      {
        name: "Industrial Equipment",
        image: "/applications/industrial-equipment.jpg",
        icon: "wrench",
      },
    ],
    faqs: [
      {
        q: "Which materials can the 3000 W Fiber Laser Cutting Machine cut?",
        a: "It is designed for sheet and tube in mild steel, stainless steel, aluminium and other metals. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: Fiber Laser; Laser Power: 3000 W; Working Area: 4000 × 2000 mm; Cutting Speed: 100–120 m/min. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 32,00,000 INR per piece.",
      },
    ],
    brochure: "/brochures/fiber-laser-3000w.pdf",
    related: [
      "fiber-laser-3kw-max",
      "fiber-steel-cutter",
      "fiber-laser-1000w",
      "fiber-laser-15kw",
    ],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-15kw",
    slug: "fiber-laser-15kw",
    name: "1.5 kW Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    badge: "Fiber Cutting",
    model: null,
    price: 310000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-1-5kw.png",
    gallery: [
      {
        src: "/machines/fiber-laser-cutting-machine-1-5kw.png",
        alt: "1.5 kW Fiber Laser Cutting Machine – view 1",
      },
    ],
    video: "/Laser_cutting_machine_cutting_metal_e77af3e2.mp4",
    videoPoster: "/machines/fiber-laser-cutting-machine-1-5kw.png",
    description: "Open-type fiber laser cutting system with Raycus source and CNC automation.",
    summary: "Open-type 1.5 kW fiber laser cutting system with Raycus source and CNC automation.",
    overview: "The 1.5 kW Fiber Laser Cutting Machine is an open-type system powered by a Raycus laser source. CNC automation and a 1500 × 3000 mm working area make it an efficient entry into precision metal cutting.",
    specs: [
      "1.5 kW laser power",
      "1500 × 3000 mm working area",
      "Raycus laser source",
    ],
    tags: ["Fiber Laser", "CNC", "Metal"],
    highlights: [
      { icon: "crosshair", label: "High Precision" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 1.5 kW" },
      { icon: "ruler", label: "Working Area: 1500 × 3000 mm" },
      { icon: "cpu", label: "Laser Source: Raycus" },
      { icon: "settings", label: "CNC Automation" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "Raycus fiber laser" },
      { parameter: "Laser Power", value: "1.5 kW" },
      { parameter: "Working Area", value: "1500 × 3000 mm" },
      { parameter: "Machine Type", value: "Open type" },
      { parameter: "Control System", value: "CNC" },
      { parameter: "Application", value: "Metal fabrication" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Faster production with excellent accuracy.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Suitable for MS, SS, Aluminum, Brass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Advanced CNC with easy operation.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "target",
        title: "Precise & Clean Cuts",
        text: "Smooth edges with minimal post-processing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Metal Fabrication",
        image: "/applications/metal-fabrication.jpg",
        icon: "factory",
      },
      { name: "Sheet Metal Work", image: "/applications/sheet-metal-work.jpg", icon: "layers" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
      { name: "Automotive Parts", image: "/applications/automotive-parts.jpg", icon: "cog" },
      {
        name: "Industrial Equipment",
        image: "/applications/industrial-equipment.jpg",
        icon: "wrench",
      },
    ],
    faqs: [
      {
        q: "Which materials can the 1.5 kW Fiber Laser Cutting Machine cut?",
        a: "It is designed for mild steel, stainless steel, aluminium and other sheet metals. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: Raycus fiber laser; Laser Power: 1.5 kW; Working Area: 1500 × 3000 mm; Machine Type: Open type. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 3,10,000 INR per piece.",
      },
    ],
    brochure: "/brochures/fiber-laser-15kw.pdf",
    related: [
      "fiber-laser-3kw-max",
      "fiber-laser-1000w",
      "fiber-steel-cutter",
      "fiber-laser-3000w",
    ],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-3kw-max",
    slug: "fiber-laser-3kw-max",
    name: "3 kW Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    badge: "Fiber Cutting",
    model: null,
    price: 2200000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-3kw.png",
    gallery: [
      {
        src: "/machines/fiber-laser-cutting-machine-3kw.png",
        alt: "3 kW Fiber Laser Cutting Machine – view 1",
      },
    ],
    video: "/Laser_cutting_machine_cutting_metal_e77af3e2.mp4",
    videoPoster: "/machines/fiber-laser-cutting-machine-3kw.png",
    description: "Open-type fiber laser cutting system with MAX source for metal fabrication.",
    summary: "Open-type 3 kW fiber laser cutting system with MAX source for demanding metal fabrication.",
    overview: "The 3 kW Fiber Laser Cutting Machine is an open-type system built around a MAX laser source. It handles thicker metals at higher speeds across a 1500 × 3000 mm bed, with CNC control for repeatable results.",
    specs: ["3 kW laser power", "1500 × 3000 mm working area", "MAX laser source"],
    tags: ["Fiber Laser", "CNC", "Metal"],
    highlights: [
      { icon: "crosshair", label: "High Precision" },
      { icon: "rocket", label: "Fast Cutting" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 3 kW" },
      { icon: "ruler", label: "Working Area: 1500 × 3000 mm" },
      { icon: "cpu", label: "Laser Source: MAX" },
      { icon: "settings", label: "CNC Automation" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "MAX fiber laser" },
      { parameter: "Laser Power", value: "3 kW" },
      { parameter: "Working Area", value: "1500 × 3000 mm" },
      { parameter: "Machine Type", value: "Open type" },
      { parameter: "Control System", value: "CNC" },
      { parameter: "Application", value: "Metal fabrication" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Cutting",
        text: "Faster production with excellent accuracy.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Suitable for MS, SS, Aluminum, Brass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Advanced CNC with easy operation.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "target",
        title: "Precise & Clean Cuts",
        text: "Smooth edges with minimal post-processing.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Metal Fabrication",
        image: "/applications/metal-fabrication.jpg",
        icon: "factory",
      },
      { name: "Sheet Metal Work", image: "/applications/sheet-metal-work.jpg", icon: "layers" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
      { name: "Automotive Parts", image: "/applications/automotive-parts.jpg", icon: "cog" },
      {
        name: "Industrial Equipment",
        image: "/applications/industrial-equipment.jpg",
        icon: "wrench",
      },
    ],
    faqs: [
      {
        q: "Which materials can the 3 kW Fiber Laser Cutting Machine cut?",
        a: "It is designed for mild steel, stainless steel, aluminium, brass and other metals. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: MAX fiber laser; Laser Power: 3 kW; Working Area: 1500 × 3000 mm; Machine Type: Open type. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right cutting configuration along with pricing. The listed price is 22,00,000 INR per piece.",
      },
    ],
    brochure: "/brochures/fiber-laser-3kw-max.pdf",
    related: [
      "fiber-laser-15kw",
      "fiber-laser-3000w",
      "fiber-steel-cutter",
      "fiber-laser-1000w",
    ],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "laser-engraving-equipment",
    slug: "laser-engraving-equipment",
    name: "Laser Engraving Equipment",
    category: "engraving",
    categoryLabel: "Fiber Laser Engraving",
    badge: "Fiber Engraving",
    model: null,
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/laser-engraving-equipment.png",
    gallery: [
      {
        src: "/machines/laser-engraving-equipment.png",
        alt: "Laser Engraving Equipment – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/laser-engraving-equipment.png",
    description: "Fiber laser engraving and marking equipment for metals and hard plastics.",
    summary: "Fiber laser engraving and marking equipment for metals and hard plastics.",
    overview: "The Laser Engraving Equipment is a 30 W fiber laser system for engraving and marking metals and hard plastics. A 200 × 200 mm marking area and speeds up to 7000 mm/s give sharp, permanent results at production pace.",
    specs: [
      "30 W laser power",
      "200 × 200 mm marking area",
      "7000 mm/s marking speed capacity",
    ],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    highlights: [
      { icon: "crosshair", label: "Permanent Marks" },
      { icon: "rocket", label: "High-Speed Marking" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 30 W" },
      { icon: "ruler", label: "Marking Area: 200 × 200 mm" },
      { icon: "gauge", label: "Speed: Up to 7000 mm/s" },
      { icon: "settings", label: "Automatic Operation" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Laser Power", value: "30 W" },
      { parameter: "Marking Area", value: "200 × 200 mm" },
      { parameter: "Marking Speed Capacity", value: "7000 mm/s" },
      { parameter: "Suitable Materials", value: "Metals and hard plastics" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Marking",
        text: "Fast, repeatable marking for production lines.",
      },
      {
        icon: "target",
        title: "Permanent, Sharp Marks",
        text: "Clear text, logos, codes and serial numbers.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple software for quick job set-up.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "layers",
        title: "Wide Material Support",
        text: "Suitable for metals and many hard plastics.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Serial & Barcode Marking",
        image: "/applications/serial-barcode.jpg",
        icon: "barcode",
      },
      { name: "Logo & Branding", image: "/applications/logo-branding.jpg", icon: "tag" },
      { name: "Tools & Hardware", image: "/applications/tools-hardware.jpg", icon: "wrench" },
      {
        name: "Automotive Components",
        image: "/applications/automotive-parts.jpg",
        icon: "cog",
      },
      { name: "Electronic Parts", image: "/applications/electronic-parts.jpg", icon: "cpu" },
    ],
    faqs: [
      {
        q: "Which materials can the Laser Engraving Equipment mark?",
        a: "It is designed for metals and hard plastics. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: Fiber Laser; Laser Power: 30 W; Marking Area: 200 × 200 mm; Marking Speed Capacity: 7000 mm/s. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right marking configuration along with pricing. The listed price is 2,20,000 INR per piece.",
      },
    ],
    brochure: "/brochures/laser-engraving-equipment.pdf",
    related: [
      "fiber-laser-marker",
      "automatic-metal-marker",
      "metal-laser-marker-f50",
      "fiber-steel-cutter",
    ],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "double-head-co2-engraver",
    slug: "double-head-co2-engraver",
    name: "Double Head CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    badge: "CO2 Engraving",
    model: "CI-1390T",
    price: 380000,
    priceUnit: "Unit",
    image: "/machines/double-head-co2-laser-engraving-machine.png",
    gallery: [
      {
        src: "/machines/double-head-co2-laser-engraving-machine.png",
        alt: "Double Head CO2 Laser Engraving Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/double-head-co2-laser-engraving-machine.png",
    description: "Dual-head CO2 engraving machine for efficient engraving and customization.",
    summary: "Dual-head CO2 laser engraving machine for efficient, high-volume engraving and customisation.",
    overview: "The Double Head CO2 Laser Engraving Machine engraves two pieces at once, doubling throughput without a larger footprint. Water cooling and a 100 W laser keep output stable through long production runs.",
    specs: ["100 W laser power", "1000 mm/s engraving speed", "CI-1390T model"],
    tags: ["CO2 Laser", "Water Cooling", "Dual Head"],
    highlights: [
      { icon: "crosshair", label: "Fine Detail" },
      { icon: "rocket", label: "Fast Engraving" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 100 W" },
      { icon: "gauge", label: "Engraving Speed: 1000 mm/s" },
      { icon: "settings", label: "Model: CI-1390T" },
      { icon: "droplets", label: "Water Cooling · Dual Head" },
    ],
    specifications: [
      { parameter: "Model", value: "CI-1390T" },
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "100 W" },
      { parameter: "Engraving Speed", value: "1000 mm/s" },
      { parameter: "Head Configuration", value: "Dual head" },
      { parameter: "Cooling", value: "Water cooling" },
    ],
    features: [
      {
        icon: "zap",
        title: "Fast Engraving",
        text: "High-speed engraving with consistent depth.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Works across wood, acrylic, leather, glass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Easy software and file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build for daily workshop use.",
      },
      {
        icon: "target",
        title: "Crisp, Permanent Results",
        text: "Sharp detail on logos, text and artwork.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Awards & Trophies", image: "/applications/awards-trophies.jpg", icon: "trophy" },
      {
        name: "Wood & Acrylic Crafts",
        image: "/applications/wood-acrylic-crafts.jpg",
        icon: "tree",
      },
      {
        name: "Personalised Gifts",
        image: "/applications/personalised-gifts.jpg",
        icon: "gift",
      },
      { name: "Stamps & Seals", image: "/applications/stamps-seals.jpg", icon: "stamp" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
    ],
    faqs: [
      {
        q: "Which materials can the Double Head CO2 Laser Engraving Machine engrave?",
        a: "It is designed for wood, acrylic, leather, MDF and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI-1390T; Laser Source: CO2 Laser; Laser Power: 100 W; Engraving Speed: 1000 mm/s. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right engraving configuration along with pricing. The listed price is 3,80,000 INR per unit.",
      },
    ],
    brochure: "/brochures/double-head-co2-engraver.pdf",
    related: [
      "co2-engraver-1490t",
      "single-head-co2-engraver",
      "automatic-co2-engraver",
      "engraving-laser-cutter-6040",
    ],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "co2-engraver-1490t",
    slug: "co2-engraver-1490t",
    name: "CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    badge: "CO2 Engraving",
    model: "CI 1490T",
    price: 270000,
    priceUnit: "Unit",
    image: "/machines/co2-laser-engraving-machine.png",
    gallery: [
      {
        src: "/machines/co2-laser-engraving-machine.png",
        alt: "CO2 Laser Engraving Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/co2-laser-engraving-machine.png",
    description: "CO2 laser engraving machine with water cooling and mild-steel body construction.",
    summary: "Water-cooled CO2 laser engraving machine with a sturdy mild-steel body for everyday production.",
    overview: "The CO2 Laser Engraving Machine pairs a 100 W laser with water cooling and a mild-steel frame for dependable day-to-day engraving. It suits workshops that need consistent quality on wood, acrylic, leather and more.",
    specs: ["100 W laser power", "500 mm/s engraving speed", "CI 1490T model"],
    tags: ["CO2 Laser", "Water Cooling", "Automatic"],
    highlights: [
      { icon: "crosshair", label: "Fine Detail" },
      { icon: "rocket", label: "Fast Engraving" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 100 W" },
      { icon: "gauge", label: "Engraving Speed: 500 mm/s" },
      { icon: "settings", label: "Model: CI 1490T" },
      { icon: "droplets", label: "Water-Cooled" },
    ],
    specifications: [
      { parameter: "Model", value: "CI 1490T" },
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "100 W" },
      { parameter: "Engraving Speed", value: "500 mm/s" },
      { parameter: "Cooling", value: "Water cooling" },
      { parameter: "Body Construction", value: "Mild steel" },
    ],
    features: [
      {
        icon: "zap",
        title: "Fast Engraving",
        text: "High-speed engraving with consistent depth.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Works across wood, acrylic, leather, glass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Easy software and file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build for daily workshop use.",
      },
      {
        icon: "target",
        title: "Crisp, Permanent Results",
        text: "Sharp detail on logos, text and artwork.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Awards & Trophies", image: "/applications/awards-trophies.jpg", icon: "trophy" },
      {
        name: "Wood & Acrylic Crafts",
        image: "/applications/wood-acrylic-crafts.jpg",
        icon: "tree",
      },
      {
        name: "Personalised Gifts",
        image: "/applications/personalised-gifts.jpg",
        icon: "gift",
      },
      { name: "Stamps & Seals", image: "/applications/stamps-seals.jpg", icon: "stamp" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
    ],
    faqs: [
      {
        q: "Which materials can the CO2 Laser Engraving Machine engrave?",
        a: "It is designed for wood, acrylic, leather, MDF and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI 1490T; Laser Source: CO2 Laser; Laser Power: 100 W; Engraving Speed: 500 mm/s. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right engraving configuration along with pricing. The listed price is 2,70,000 INR per unit.",
      },
    ],
    brochure: "/brochures/co2-engraver-1490t.pdf",
    related: [
      "double-head-co2-engraver",
      "single-head-co2-engraver",
      "automatic-co2-engraver",
      "acrylic-laser-cutter",
    ],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "single-head-co2-engraver",
    slug: "single-head-co2-engraver",
    name: "Single Head CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    badge: "CO2 Engraving",
    model: "CI-6040A",
    price: 220000,
    priceUnit: "Unit",
    image: "/machines/single-head-co2-laser-engraving-machine.png",
    gallery: [
      {
        src: "/machines/single-head-co2-laser-engraving-machine.png",
        alt: "Single Head CO2 Laser Engraving Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/single-head-co2-laser-engraving-machine.png",
    description: "Single-head CO2 engraving machine for workshop and production use.",
    summary: "Single-head CO2 laser engraving machine for workshop and production use, in 80 W or 100 W.",
    overview: "The Single Head CO2 Laser Engraving Machine is a versatile workshop engraver available with an 80 W or 100 W laser. Water cooling and a compact bed make it a practical choice for small and mid-size operations.",
    specs: [
      "80 W / 100 W laser power",
      "500 mm/s engraving speed",
      "CI-6040A model",
    ],
    tags: ["CO2 Laser", "Water Cooling", "Single Head"],
    highlights: [
      { icon: "crosshair", label: "Fine Detail" },
      { icon: "rocket", label: "Fast Engraving" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 80 W / 100 W" },
      { icon: "gauge", label: "Engraving Speed: 500 mm/s" },
      { icon: "settings", label: "Model: CI-6040A" },
      { icon: "droplets", label: "Water Cooling · Single Head" },
    ],
    specifications: [
      { parameter: "Model", value: "CI-6040A" },
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "80 W / 100 W" },
      { parameter: "Engraving Speed", value: "500 mm/s" },
      { parameter: "Head Configuration", value: "Single head" },
      { parameter: "Cooling", value: "Water cooling" },
    ],
    features: [
      {
        icon: "zap",
        title: "Fast Engraving",
        text: "High-speed engraving with consistent depth.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Works across wood, acrylic, leather, glass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Easy software and file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build for daily workshop use.",
      },
      {
        icon: "target",
        title: "Crisp, Permanent Results",
        text: "Sharp detail on logos, text and artwork.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Awards & Trophies", image: "/applications/awards-trophies.jpg", icon: "trophy" },
      {
        name: "Wood & Acrylic Crafts",
        image: "/applications/wood-acrylic-crafts.jpg",
        icon: "tree",
      },
      {
        name: "Personalised Gifts",
        image: "/applications/personalised-gifts.jpg",
        icon: "gift",
      },
      { name: "Stamps & Seals", image: "/applications/stamps-seals.jpg", icon: "stamp" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
    ],
    faqs: [
      {
        q: "Which materials can the Single Head CO2 Laser Engraving Machine engrave?",
        a: "It is designed for wood, acrylic, leather, MDF and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI-6040A; Laser Source: CO2 Laser; Laser Power: 80 W / 100 W; Engraving Speed: 500 mm/s. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right engraving configuration along with pricing. The listed price is 2,20,000 INR per unit.",
      },
    ],
    brochure: "/brochures/single-head-co2-engraver.pdf",
    related: [
      "co2-engraver-1490t",
      "double-head-co2-engraver",
      "engraving-laser-cutter-6040",
      "automatic-co2-engraver",
    ],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "automatic-co2-engraver",
    slug: "automatic-co2-engraver",
    name: "Automatic CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    badge: "CO2 Engraving",
    model: "CI-9060T",
    price: 380000,
    priceUnit: "Unit",
    image: "/machines/automatic-co2-laser-engraving-machine.png",
    gallery: [
      {
        src: "/machines/automatic-co2-laser-engraving-machine.png",
        alt: "Automatic CO2 Laser Engraving Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/automatic-co2-laser-engraving-machine.png",
    description: "Automatic CO2 laser engraving machine with water cooling and CNC-ready operation.",
    summary: "Automatic CO2 laser engraving machine with water cooling and CNC-ready operation.",
    overview: "The Automatic CO2 Laser Engraving Machine offers a larger CI-9060T bed with CNC-ready automation. A 100 W laser and water cooling support steady, repeatable engraving on a wide range of non-metal materials.",
    specs: ["100 W laser power", "500 mm/s engraving speed", "CI-9060T model"],
    tags: ["CO2 Laser", "Automatic", "Water Cooling"],
    highlights: [
      { icon: "crosshair", label: "Fine Detail" },
      { icon: "rocket", label: "Fast Engraving" },
      { icon: "settings", label: "Easy Operation" },
      { icon: "layers", label: "Multi-Material" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 100 W" },
      { icon: "gauge", label: "Engraving Speed: 500 mm/s" },
      { icon: "settings", label: "Model: CI-9060T" },
      { icon: "cpu", label: "Automatic · CNC-Ready" },
    ],
    specifications: [
      { parameter: "Model", value: "CI-9060T" },
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "100 W" },
      { parameter: "Engraving Speed", value: "500 mm/s" },
      { parameter: "Cooling", value: "Water cooling" },
      { parameter: "Operation", value: "Automatic, CNC-ready" },
    ],
    features: [
      {
        icon: "zap",
        title: "Fast Engraving",
        text: "High-speed engraving with consistent depth.",
      },
      {
        icon: "layers",
        title: "Versatile Material",
        text: "Works across wood, acrylic, leather, glass and more.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Easy software and file handling.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Sturdy build for daily workshop use.",
      },
      {
        icon: "target",
        title: "Crisp, Permanent Results",
        text: "Sharp detail on logos, text and artwork.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Awards & Trophies", image: "/applications/awards-trophies.jpg", icon: "trophy" },
      {
        name: "Wood & Acrylic Crafts",
        image: "/applications/wood-acrylic-crafts.jpg",
        icon: "tree",
      },
      {
        name: "Personalised Gifts",
        image: "/applications/personalised-gifts.jpg",
        icon: "gift",
      },
      { name: "Stamps & Seals", image: "/applications/stamps-seals.jpg", icon: "stamp" },
      { name: "Signage & Display", image: "/applications/signage-display.jpg", icon: "monitor" },
    ],
    faqs: [
      {
        q: "Which materials can the Automatic CO2 Laser Engraving Machine engrave?",
        a: "It is designed for wood, acrylic, leather, MDF and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI-9060T; Laser Source: CO2 Laser; Laser Power: 100 W; Engraving Speed: 500 mm/s. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right engraving configuration along with pricing. The listed price is 3,80,000 INR per unit.",
      },
    ],
    brochure: "/brochures/automatic-co2-engraver.pdf",
    related: [
      "co2-engraver-1490t",
      "double-head-co2-engraver",
      "single-head-co2-engraver",
      "acrylic-laser-cutter",
    ],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "metal-laser-marker-f50",
    slug: "metal-laser-marker-f50",
    name: "Metal Laser Marking Machine",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    badge: "Fiber Marking",
    model: "CI-F50",
    price: 570000,
    priceUnit: "Unit",
    image: "/machines/metal-laser-marking-machine.png",
    gallery: [
      {
        src: "/machines/metal-laser-marking-machine.png",
        alt: "Metal Laser Marking Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/metal-laser-marking-machine.png",
    description: "Automatic fiber laser marking machine for clear, high-speed metal marking.",
    summary: "Automatic 50 W fiber laser marking machine for clear, high-speed metal marking.",
    overview: "The Metal Laser Marking Machine is a 50 W automatic fiber marker for sharp, permanent marks on metal. A 175 × 175 mm marking field and fast scanning make it well suited to production-line identification.",
    specs: ["50 W laser power", "175 × 175 mm marking area", "CI-F50 model"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    highlights: [
      { icon: "crosshair", label: "Permanent Marks" },
      { icon: "rocket", label: "High-Speed Marking" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 50 W" },
      { icon: "ruler", label: "Marking Area: 175 × 175 mm" },
      { icon: "settings", label: "Model: CI-F50" },
      { icon: "cpu", label: "Automatic Operation" },
    ],
    specifications: [
      { parameter: "Model", value: "CI-F50" },
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Laser Power", value: "50 W" },
      { parameter: "Marking Area", value: "175 × 175 mm" },
      { parameter: "Operation", value: "Automatic" },
      { parameter: "Suitable Materials", value: "Metals" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Marking",
        text: "Fast, repeatable marking for production lines.",
      },
      {
        icon: "target",
        title: "Permanent, Sharp Marks",
        text: "Clear text, logos, codes and serial numbers.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple software for quick job set-up.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "layers",
        title: "Wide Material Support",
        text: "Suitable for metals and many hard plastics.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Serial & Barcode Marking",
        image: "/applications/serial-barcode.jpg",
        icon: "barcode",
      },
      { name: "Logo & Branding", image: "/applications/logo-branding.jpg", icon: "tag" },
      { name: "Tools & Hardware", image: "/applications/tools-hardware.jpg", icon: "wrench" },
      {
        name: "Automotive Components",
        image: "/applications/automotive-parts.jpg",
        icon: "cog",
      },
      { name: "Electronic Parts", image: "/applications/electronic-parts.jpg", icon: "cpu" },
    ],
    faqs: [
      {
        q: "Which materials can the Metal Laser Marking Machine mark?",
        a: "It is designed for metals and hard plastics. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI-F50; Laser Source: Fiber Laser; Laser Power: 50 W; Marking Area: 175 × 175 mm. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right marking configuration along with pricing. The listed price is 5,70,000 INR per unit.",
      },
    ],
    brochure: "/brochures/metal-laser-marker-f50.pdf",
    related: [
      "fiber-laser-marker",
      "automatic-metal-marker",
      "laser-stamp-machine",
      "laser-engraving-equipment",
    ],
    source: SOURCE_URLS.marking,
  },
  {
    id: "co2-laser-marker",
    slug: "co2-laser-marker",
    name: "CO2 Laser Marking Machine",
    category: "marking",
    categoryLabel: "CO2 Laser Marking",
    badge: "CO2 Marking",
    model: null,
    price: 450000,
    priceUnit: "Unit",
    image: "/machines/co2-laser-marking-machine.png",
    gallery: [
      {
        src: "/machines/co2-laser-marking-machine.png",
        alt: "CO2 Laser Marking Machine – view 1",
      },
      {
        src: "/machines/co2-laser-marking_transparent.png",
        alt: "CO2 Laser Marking Machine – view 2",
      },
    ],
    video: null,
    videoPoster: "/machines/co2-laser-marking-machine.png",
    description: "CO2 laser marking system listed for wood marking and engraving applications.",
    summary: "100 W CO2 laser marking system for wood marking and engraving applications.",
    overview: "The CO2 Laser Marking Machine is a 100 W air-cooled system for wood marking and engraving. A generous 400 × 400 mm marking area handles larger pieces and batch jobs with ease.",
    specs: ["100 W power", "400 × 400 mm marking area", "Air cooling"],
    tags: ["CO2 Laser", "Wood", "Air Cooling"],
    highlights: [
      { icon: "crosshair", label: "Clear Marks" },
      { icon: "rocket", label: "Fast Marking" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "layers", label: "Non-Metal Friendly" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 100 W" },
      { icon: "ruler", label: "Marking Area: 400 × 400 mm" },
      { icon: "wind", label: "Air Cooling" },
      { icon: "layers", label: "Wood Marking & Engraving" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "CO2 Laser" },
      { parameter: "Laser Power", value: "100 W" },
      { parameter: "Marking Area", value: "400 × 400 mm" },
      { parameter: "Cooling", value: "Air cooling" },
      { parameter: "Suitable Materials", value: "Wood" },
    ],
    features: [
      { icon: "zap", title: "Fast Marking", text: "Quick, repeatable marking and engraving." },
      {
        icon: "layers",
        title: "Non-Metal Materials",
        text: "Suited to wood and other non-metal surfaces.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple software for quick job set-up.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      { icon: "target", title: "Clean, Crisp Results", text: "Sharp text, logos and artwork." },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Air-cooled configuration keeps upkeep simple.",
      },
    ],
    applications: [
      { name: "Wood Marking", image: "/applications/wood-marking.jpg", icon: "tree" },
      { name: "Logo & Branding", image: "/applications/logo-branding.jpg", icon: "tag" },
      {
        name: "Personalised Gifts",
        image: "/applications/personalised-gifts.jpg",
        icon: "gift",
      },
      { name: "Packaging", image: "/applications/gifts-packaging.jpg", icon: "package" },
      {
        name: "Craft & Decor",
        image: "/applications/wood-acrylic-crafts.jpg",
        icon: "sparkles",
      },
    ],
    faqs: [
      {
        q: "Which materials can the CO2 Laser Marking Machine mark?",
        a: "It is designed for wood and other non-metal materials. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: CO2 Laser; Laser Power: 100 W; Marking Area: 400 × 400 mm; Cooling: Air cooling. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right marking configuration along with pricing. The listed price is 4,50,000 INR per unit.",
      },
    ],
    brochure: "/brochures/co2-laser-marker.pdf",
    related: [
      "metal-laser-marker-f50",
      "fiber-laser-marker",
      "co2-engraver-1490t",
      "automatic-metal-marker",
    ],
    source: SOURCE_URLS.marking,
  },
  {
    id: "automatic-metal-marker",
    slug: "automatic-metal-marker",
    name: "Automatic Metal Laser Marking Machine",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    badge: "Fiber Marking",
    model: "CI-30W",
    price: 190000,
    priceUnit: "Piece",
    image: "/machines/automatic-metal-laser-marking-machine.png",
    gallery: [
      {
        src: "/machines/automatic-metal-laser-marking-machine.png",
        alt: "Automatic Metal Laser Marking Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/automatic-metal-laser-marking-machine.png",
    description: "Automatic metal marking system for repeatable marking applications.",
    summary: "Automatic 30 W metal laser marking system for fast, repeatable marking applications.",
    overview: "The Automatic Metal Laser Marking Machine delivers fast, repeatable marks at speeds up to 7000 mm/s. Air cooling and automatic operation keep set-up simple and running costs low.",
    specs: ["CI-30W model", "7000 mm/s marking speed", "Air cooling"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    highlights: [
      { icon: "crosshair", label: "Permanent Marks" },
      { icon: "rocket", label: "High-Speed Marking" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "settings", label: "Model: CI-30W" },
      { icon: "gauge", label: "Marking Speed: 7000 mm/s" },
      { icon: "wind", label: "Air Cooling" },
      { icon: "cpu", label: "Automatic Operation" },
    ],
    specifications: [
      { parameter: "Model", value: "CI-30W" },
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Marking Speed", value: "7000 mm/s" },
      { parameter: "Cooling", value: "Air cooling" },
      { parameter: "Operation", value: "Automatic" },
      { parameter: "Suitable Materials", value: "Metals" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Marking",
        text: "Fast, repeatable marking for production lines.",
      },
      {
        icon: "target",
        title: "Permanent, Sharp Marks",
        text: "Clear text, logos, codes and serial numbers.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple software for quick job set-up.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "layers",
        title: "Wide Material Support",
        text: "Suitable for metals and many hard plastics.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Serial & Barcode Marking",
        image: "/applications/serial-barcode.jpg",
        icon: "barcode",
      },
      { name: "Logo & Branding", image: "/applications/logo-branding.jpg", icon: "tag" },
      { name: "Tools & Hardware", image: "/applications/tools-hardware.jpg", icon: "wrench" },
      {
        name: "Automotive Components",
        image: "/applications/automotive-parts.jpg",
        icon: "cog",
      },
      { name: "Electronic Parts", image: "/applications/electronic-parts.jpg", icon: "cpu" },
    ],
    faqs: [
      {
        q: "Which materials can the Automatic Metal Laser Marking Machine mark?",
        a: "It is designed for metals and hard plastics. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI-30W; Laser Source: Fiber Laser; Marking Speed: 7000 mm/s; Cooling: Air cooling. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right marking configuration along with pricing. The listed price is 1,90,000 INR per piece.",
      },
    ],
    brochure: "/brochures/automatic-metal-marker.pdf",
    related: [
      "fiber-laser-marker",
      "metal-laser-marker-f50",
      "laser-stamp-machine",
      "laser-engraving-equipment",
    ],
    source: SOURCE_URLS.marking,
  },
  {
    id: "laser-stamp-machine",
    slug: "laser-stamp-machine",
    name: "Laser Stamp Machine",
    category: "marking",
    categoryLabel: "Laser Marking",
    badge: "Laser Marking",
    model: null,
    price: 170000,
    priceUnit: "Piece",
    image: "/machines/laser-stamp-machine.png",
    gallery: [
      { src: "/machines/laser-stamp-machine.png", alt: "Laser Stamp Machine – view 1" },
    ],
    video: null,
    videoPoster: "/machines/laser-stamp-machine.png",
    description: "Electric laser stamping machine for number marking applications.",
    summary: "Electric laser stamping machine for fast, clear number marking.",
    overview: "The Laser Stamp Machine is a 20 W electric system for stamping numbers and codes onto metal parts. It runs on a standard 220 V supply and is simple to set up and operate.",
    specs: ["20 W power", "220 V", "Electric operation"],
    tags: ["Fiber Laser", "Number Marking", "Electric"],
    highlights: [
      { icon: "crosshair", label: "Sharp Numbers" },
      { icon: "rocket", label: "Quick Marking" },
      { icon: "settings", label: "Simple Operation" },
      { icon: "plug", label: "Electric Powered" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 20 W" },
      { icon: "plug", label: "Supply: 220 V" },
      { icon: "settings", label: "Electric Operation" },
      { icon: "barcode", label: "Number Marking" },
    ],
    specifications: [
      { parameter: "Laser Power", value: "20 W" },
      { parameter: "Voltage", value: "220 V" },
      { parameter: "Operation", value: "Electric" },
      { parameter: "Application", value: "Number marking" },
    ],
    features: [
      { icon: "zap", title: "Quick Marking", text: "Fast stamping for numbers and codes." },
      {
        icon: "target",
        title: "Permanent Impressions",
        text: "Clear, lasting marks on metal parts.",
      },
      { icon: "pointer", title: "Simple Operation", text: "Easy to set up and use." },
      { icon: "plug", title: "Electric Operation", text: "Runs on standard 220 V supply." },
      { icon: "shield", title: "Stable & Durable", text: "Robust design for workshop use." },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      { name: "Number Marking", image: "/applications/number-marking.jpg", icon: "barcode" },
      { name: "Tools & Hardware", image: "/applications/tools-hardware.jpg", icon: "wrench" },
      {
        name: "Automotive Components",
        image: "/applications/automotive-parts.jpg",
        icon: "cog",
      },
      {
        name: "Industrial Parts",
        image: "/applications/industrial-equipment.jpg",
        icon: "factory",
      },
      { name: "Serial Identification", image: "/applications/serial-barcode.jpg", icon: "tag" },
    ],
    faqs: [
      {
        q: "Which materials can the Laser Stamp Machine mark?",
        a: "It is designed for metal parts and components. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Power: 20 W; Voltage: 220 V; Operation: Electric. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right marking configuration along with pricing. The listed price is 1,70,000 INR per piece.",
      },
    ],
    brochure: "/brochures/laser-stamp-machine.pdf",
    related: [
      "fiber-laser-marker",
      "automatic-metal-marker",
      "metal-laser-marker-f50",
      "jewellery-hallmarking-machine",
    ],
    source: SOURCE_URLS.marking,
  },
  {
    id: "fiber-laser-marker",
    slug: "fiber-laser-marker",
    name: "Fiber Laser Marker",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    badge: "Fiber Marking",
    model: null,
    price: 175000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-marker.png",
    gallery: [
      { src: "/machines/fiber-laser-marker.png", alt: "Fiber Laser Marker – view 1" },
    ],
    video: null,
    videoPoster: "/machines/fiber-laser-marker.png",
    description: "Fiber laser marker for metal marking with an air-cooled configuration.",
    summary: "Air-cooled 30 W fiber laser marker for fast, permanent metal marking.",
    overview: "The Fiber Laser Marker is an air-cooled 30 W system that produces sharp, permanent marks on metal at a 1064 nm wavelength. A 175 × 175 mm marking area covers most part sizes.",
    specs: ["30 W power", "175 × 175 mm marking area", "1064 nm wavelength"],
    tags: ["Fiber Laser", "Air Cooling", "Metal"],
    highlights: [
      { icon: "crosshair", label: "Permanent Marks" },
      { icon: "rocket", label: "High-Speed Marking" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "leaf", label: "Energy Efficient" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 30 W" },
      { icon: "ruler", label: "Marking Area: 175 × 175 mm" },
      { icon: "gauge", label: "Wavelength: 1064 nm" },
      { icon: "wind", label: "Air-Cooled" },
    ],
    specifications: [
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Laser Power", value: "30 W" },
      { parameter: "Marking Area", value: "175 × 175 mm" },
      { parameter: "Wavelength", value: "1064 nm" },
      { parameter: "Cooling", value: "Air cooling" },
      { parameter: "Suitable Materials", value: "Metals" },
    ],
    features: [
      {
        icon: "zap",
        title: "High-Speed Marking",
        text: "Fast, repeatable marking for production lines.",
      },
      {
        icon: "target",
        title: "Permanent, Sharp Marks",
        text: "Clear text, logos, codes and serial numbers.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple software for quick job set-up.",
      },
      {
        icon: "shield",
        title: "Stable & Durable",
        text: "Robust design for long-term performance.",
      },
      {
        icon: "layers",
        title: "Wide Material Support",
        text: "Suitable for metals and many hard plastics.",
      },
      {
        icon: "wrench",
        title: "Low Maintenance",
        text: "Reliable operation with reduced downtime.",
      },
    ],
    applications: [
      {
        name: "Serial & Barcode Marking",
        image: "/applications/serial-barcode.jpg",
        icon: "barcode",
      },
      { name: "Logo & Branding", image: "/applications/logo-branding.jpg", icon: "tag" },
      { name: "Tools & Hardware", image: "/applications/tools-hardware.jpg", icon: "wrench" },
      {
        name: "Automotive Components",
        image: "/applications/automotive-parts.jpg",
        icon: "cog",
      },
      { name: "Electronic Parts", image: "/applications/electronic-parts.jpg", icon: "cpu" },
    ],
    faqs: [
      {
        q: "Which materials can the Fiber Laser Marker mark?",
        a: "It is designed for metals and hard plastics. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Laser Source: Fiber Laser; Laser Power: 30 W; Marking Area: 175 × 175 mm; Wavelength: 1064 nm. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right marking configuration along with pricing. The listed price is 1,75,000 INR per piece.",
      },
    ],
    brochure: "/brochures/fiber-laser-marker.pdf",
    related: [
      "metal-laser-marker-f50",
      "automatic-metal-marker",
      "laser-stamp-machine",
      "laser-engraving-equipment",
    ],
    source: SOURCE_URLS.marking,
  },
  {
    id: "jewellery-hallmarking-machine",
    slug: "jewellery-hallmarking-machine",
    name: "Jewellery Laser Hallmarking Machine",
    category: "marking",
    categoryLabel: "Jewellery Marking",
    badge: "Jewellery Marking",
    model: "CI RFL-20W",
    price: 170000,
    priceUnit: "Unit",
    image: "/machines/jewellery-laser-hallmarking-machine.png",
    gallery: [
      {
        src: "/machines/jewellery-laser-hallmarking-machine.png",
        alt: "Jewellery Laser Hallmarking Machine – view 1",
      },
    ],
    video: null,
    videoPoster: "/machines/jewellery-laser-hallmarking-machine.png",
    description: "Portable jewellery marking system for detailed hallmarking applications.",
    summary: "Portable 20 W jewellery laser hallmarking system for detailed, permanent marks.",
    overview: "The Jewellery Laser Hallmarking Machine is a portable 20 W system for detailed hallmarking on gold and silver pieces. Speeds up to 8000 mm/s and air cooling make it quick and easy to use at the jeweller's bench.",
    specs: [
      "20 W laser power",
      "8000 mm/s marking speed capacity",
      "CI RFL-20W model",
    ],
    tags: ["Fiber Laser", "Jewellery", "Air Cooling"],
    highlights: [
      { icon: "crosshair", label: "Fine Hallmarking" },
      { icon: "gem", label: "Jewellery Ready" },
      { icon: "settings", label: "Low Maintenance" },
      { icon: "box", label: "Portable Design" },
    ],
    quickSpecs: [
      { icon: "zap", label: "Laser Power: 20 W" },
      { icon: "gauge", label: "Speed: Up to 8000 mm/s" },
      { icon: "settings", label: "Model: CI RFL-20W" },
      { icon: "wind", label: "Air Cooling · Portable" },
    ],
    specifications: [
      { parameter: "Model", value: "CI RFL-20W" },
      { parameter: "Laser Source", value: "Fiber Laser" },
      { parameter: "Laser Power", value: "20 W" },
      { parameter: "Marking Speed Capacity", value: "8000 mm/s" },
      { parameter: "Cooling", value: "Air cooling" },
      { parameter: "Design", value: "Portable" },
    ],
    features: [
      {
        icon: "target",
        title: "Fine Hallmarking",
        text: "Sharp, detailed marks on small pieces.",
      },
      {
        icon: "gem",
        title: "Jewellery Ready",
        text: "Built for gold and silver jewellery work.",
      },
      {
        icon: "box",
        title: "Portable System",
        text: "Compact design that fits a jeweller's bench.",
      },
      {
        icon: "pointer",
        title: "User-Friendly Control",
        text: "Simple software for quick job set-up.",
      },
      { icon: "zap", title: "High-Speed Marking", text: "Fast marking for repeat orders." },
      { icon: "wrench", title: "Low Maintenance", text: "Air-cooled, reliable operation." },
    ],
    applications: [
      { name: "Hallmarking", image: "/applications/hallmarking.jpg", icon: "gem" },
      { name: "Name & Logo Marking", image: "/applications/logo-branding.jpg", icon: "tag" },
      {
        name: "Custom Jewellery",
        image: "/applications/custom-jewellery.jpg",
        icon: "sparkles",
      },
      { name: "Rings & Bangles", image: "/applications/rings-bangles.jpg", icon: "gem" },
      {
        name: "Jewellery Workshops",
        image: "/applications/jewellery-workshops.jpg",
        icon: "factory",
      },
    ],
    faqs: [
      {
        q: "Which materials can the Jewellery Laser Hallmarking Machine mark?",
        a: "It is designed for gold, silver and other jewellery metals. For a specific material or thickness, share your requirement through Get a Quote and our team will confirm suitability.",
      },
      {
        q: "What are the key specifications of this machine?",
        a: "Model: CI RFL-20W; Laser Source: Fiber Laser; Laser Power: 20 W; Marking Speed Capacity: 8000 mm/s. The full list is under Technical Specifications on this page.",
      },
      {
        q: "Is installation, training and after-sales support available?",
        a: "Our team can guide you on installation, operator training and after-sales support. Please use Get a Quote to discuss the details for your location.",
      },
      {
        q: "Can I get a customised configuration or a quote?",
        a: "Yes. Tell us your application, material and production volume through Get a Quote, and we will recommend the right marking configuration along with pricing. The listed price is 1,70,000 INR per unit.",
      },
    ],
    brochure: "/brochures/jewellery-hallmarking-machine.pdf",
    related: [
      "gold-silver-cutter",
      "fiber-laser-marker",
      "laser-stamp-machine",
      "metal-laser-marker-f50",
    ],
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

/* "25,00,000" – for layouts that style the ₹ symbol separately */
export const formatPriceNumber = (price) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price);

export const getProductBySlug = (slug) =>
  products.find((product) => product.slug === slug);

export const getRelatedProducts = (product, limit = 4) =>
  (product.related || [])
    .map((id) => products.find((item) => item.id === id))
    .filter(Boolean)
    .slice(0, limit);

/* ---- Guard: every product must define every detail-page field ---- */
export const REQUIRED_PRODUCT_FIELDS = [
  "id", "slug", "name", "category", "categoryLabel", "badge", "model",
  "price", "priceUnit", "image", "gallery", "video", "description",
  "summary", "overview", "specs", "tags", "highlights", "quickSpecs",
  "specifications", "features", "applications", "faqs", "brochure",
  "related", "source",
];

if (process.env.NODE_ENV !== "production") {
  products.forEach((product) => {
    const missing = REQUIRED_PRODUCT_FIELDS.filter((field) => !(field in product));
    if (missing.length) {
      throw new Error(`products.js: "${product.id}" is missing: ${missing.join(", ")}`);
    }
  });
}
