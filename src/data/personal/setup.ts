import { SetupItem } from "@/types";
import { ToolboxSetupItemCategory } from "@/types/enum";

export const setup: SetupItem[] = [
  {
    id: "macbook-pro-16",
    name: "Asus TUF F17 (17 inch), 2021",
    category: ToolboxSetupItemCategory.HARDWARE,
    tags: ["Laptop"],
    description:
      "17.3-inch FHD IPS panel with 144Hz refresh rate. Military-grade durability for daily use.",
    imageUrl: "/img/setup/asus-f17-17-inch-2021.jpg",
    purchaseUrl:
      "https://www.asus.com/us/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-f17/",
  },
  {
    id: "obsbot-tiny-3-lite",
    name: "Obsbot Tiny 3 Lite Webcam",
    category: ToolboxSetupItemCategory.HARDWARE,
    tags: ["Webcam"],
    description:
      "Compact webcam with 1/2-inch CMOS sensor, 4K at 30fps and 1080p at 120fps. AI-powered tracking and framing for seamless video calls.",
    imageUrl: "/img/setup/obsbot-tiny-3-lite.jpg",
    purchaseUrl:
      "https://www.obsbot.com/store/products/tiny-3-lite?variant=Regular_Price",
  },
  {
    id: "xiaomi-redmi-g34wq",
    name: "Xiaomi Redmi G34WQ Monitor",
    category: ToolboxSetupItemCategory.HARDWARE,
    tags: ["Monitor"],
    description:
      "34-inch curved gaming monitor, WQHD resolution, 180Hz refresh rate, 1500R curvature. TÜV certified for reduced eye strain.",
    imageUrl: "/img/setup/monitor-redmi-g34wq-2026.png",
    purchaseUrl:
      "https://www.mi.com/global/product/xiaomi-curved-gaming-monitor-g34wqi-2026/",
  },
  {
    id: "steelseries-apex-pro-gen-3",
    name: "SteelSeries Apex Pro Gen 3",
    category: ToolboxSetupItemCategory.ACCESSORIES,
    tags: ["Keyboard"],
    description:
      "OmniPoint 3.0 adjustable switches let you fine-tune actuation distance for every key. Personalized typing and gaming experience.",
    imageUrl: "/img/setup/steelseries-apex-pro-gen-3.jpg",
    purchaseUrl: "https://steelseries.com/gaming-keyboards/apex-pro-gen-3",
  },
  {
    id: "steelseries-aerox-5-wireless",
    name: "SteelSeries Aerox 5 Wireless",
    category: ToolboxSetupItemCategory.ACCESSORIES,
    tags: ["Mouse"],
    description:
      "Lightweight honeycomb shell at 66g. TrueMove Air optical sensor for precise tracking.",
    imageUrl: "/img/setup/steelseries-aerox-5-wireless.png",
    purchaseUrl: "https://steelseries.com/gaming-mice/aerox-5-wireless",
  },
  {
    id: "steelseries-alias-usb-mic",
    name: "SteelSeries Alias USB Mic",
    category: ToolboxSetupItemCategory.AUDIO,
    tags: ["Microphone"],
    description:
      "Professional-grade sound for streamers. Balanced frequency response with minimal background noise.",
    imageUrl: "/img/setup/steelseries-alias-usb-mic.png",
    purchaseUrl:
      "https://steelseries.com/gaming-microphones/alias?model=Regular",
  },
  {
    id: "quntis-rgb-pro-plus",
    name: "Quntis RGB Pro Plus",
    category: ToolboxSetupItemCategory.ACCESSORIES,
    tags: ["Lighting"],
    description:
      "Desktop RGB light strip with 360° rotatable bracket. Multiple color modes and brightness levels for custom lighting.",
    imageUrl: "/img/setup/quntis-rgb-pro-plus.jpg",
    purchaseUrl: "https://www.amazon.com/dp/B0D5BBPJ23",
  },
  {
    id: "diablo-v-basic-black-grey",
    name: "Diablo V Basic Black Grey",
    category: ToolboxSetupItemCategory.HARDWARE,
    tags: ["Chair"],
    description:
      "Fully adjustable, supportive, and breathable desk chair in black and white finish.",
    imageUrl: "/img/setup/diablo-v-basic-black-grey.jpg",
    purchaseUrl:
      "https://diablochairs.com/en/3540-ergonomic-chair-diablo-v-basic-black-grey",
  },
  {
    id: "playstation-dualsense-gray-camouflage",
    name: "PlayStation DualSense® - Gray Camouflage",
    category: ToolboxSetupItemCategory.HARDWARE,
    tags: ["Controller"],
    description:
      "Refined design with subtle texture details and updated logo in Gray Camouflage.",
    imageUrl: "/img/setup/playstation-dualsense-gray-camouflage.jpg",
    purchaseUrl:
      "https://direct.playstation.com/fr-fr/buy-accessories/dualsense-wireless-controller-grey-camouflage-for-ps5-pc-mac-mobile",
  },
];
