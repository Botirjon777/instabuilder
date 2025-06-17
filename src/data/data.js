const localImages = [
  "/assets/games/cs2.jpg",
  "/assets/games/ah.png",
  "/assets/games/awii.png",
  "/assets/games/bg.jpg",
  "/assets/games/cod.jpg",
];

function getRandomImage() {
  return localImages[Math.floor(Math.random() * localImages.length)];
}

export const games = [
  { id: 1, title: "Counter-Strike 2", image: getRandomImage() },
  { id: 2, title: "Valorant", image: getRandomImage() },
  { id: 3, title: "Fortnite", image: getRandomImage() },
  { id: 4, title: "Apex Legends", image: getRandomImage() },
  { id: 5, title: "Call of Duty: Warzone", image: getRandomImage() },
  { id: 6, title: "PUBG: Battlegrounds", image: getRandomImage() },
  { id: 7, title: "League of Legends", image: getRandomImage() },
  { id: 8, title: "Dota 2", image: getRandomImage() },
  { id: 9, title: "Overwatch 2", image: getRandomImage() },
  { id: 10, title: "Minecraft", image: getRandomImage() },
  { id: 11, title: "GTA V", image: getRandomImage() },
  { id: 12, title: "The Witcher 3", image: getRandomImage() },
  { id: 13, title: "Cyberpunk 2077", image: getRandomImage() },
  { id: 14, title: "Red Dead Redemption 2", image: getRandomImage() },
  { id: 15, title: "Elden Ring", image: getRandomImage() },
  { id: 16, title: "Rainbow Six Siege", image: getRandomImage() },
  { id: 17, title: "Rocket League", image: getRandomImage() },
  { id: 18, title: "Escape from Tarkov", image: getRandomImage() },
  { id: 19, title: "Battlefield 2042", image: getRandomImage() },
  { id: 20, title: "Starfield", image: getRandomImage() },
  { id: 21, title: "Hogwarts Legacy", image: getRandomImage() },
  { id: 22, title: "Far Cry 6", image: getRandomImage() },
  { id: 23, title: "Assassin's Creed Valhalla", image: getRandomImage() },
  { id: 24, title: "God of War", image: getRandomImage() },
];

export const caseSizes = [
  { id: 1, type: "Large", image: "/assets/cases/case-sizes/large.png" },
  { id: 2, type: "Medium", image: "/assets/cases/case-sizes/medium.png" },
  { id: 3, type: "Small", image: "/assets/cases/case-sizes/small.png" },
];

export const case_sizes = [
  {
    id: 1,
    type: "Tower Desktop",
    image: "/assets/cases/case-sizes/large.png",
  },
  {
    id: 2,
    type: "Mini Desktop",
    image: "/assets/cases/case-sizes/medium.png",
  },
  {
    id: 3,
    type: "Workstation Laptop",
    image: "/assets/cases/case-sizes/laptop.png",
  },
];

export const caseTypes = [
  { id: 1, type: "Windowed", image: "/assets/cases/case-types/windowed.png" },
  { id: 2, type: "Default", image: "/assets/cases/case-types/default.png" },
];

export const chipBrands = [
  { id: 1, type: "Intel", image: "/assets/chips/intel.png" },
  { id: 2, type: "AMD", image: "/assets/chips/amd.jpg" },
  { id: 3, type: "NVIDIA", image: "/assets/chips/nvidia.png" },
  { id: 4, type: "RADEON", image: "/assets/chips/radeon.png" },
  { id: 5, type: "ARC", image: "/assets/chips/arc.png" },
];

export const chip_brands = [
  {
    id: 1,
    type: "Intel",
    image: "/assets/chips/intel.png",
  },
  {
    id: 2,
    type: "AMD",
    image: "/assets/chips/amd.jpg",
  },
  {
    id: 3,
    type: "NVIDIA",
    image: "/assets/chips/nvidia.png",
  },
  {
    id: 4,
    type: "RADEON",
    image: "/assets/chips/radeon.png",
  },
];

export const filters = [
  { id: 1, label: "Architecture Engineering and Construction" },
  { id: 2, label: "Content Creation" },
  { id: 3, label: "Product Development" },
  { id: 4, label: "Data Science" },
  { id: 5, label: "Media and Entertainment" },
  { id: 6, label: "All Software" },
];

export const resolutions = [
  { id: "1080", label: "1080 (FullHD)" },
  { id: "1440", label: "1440 (QHD)" },
  { id: "4K", label: "4K" },
];

export const apps = [
  {
    id: 1,
    title: "After Effects",
    image: "/assets/apps/ae.png",
  },
  {
    id: 2,
    title: "Dimension",
    image: "/assets/apps/dn.png",
  },
  {
    id: 3,
    title: "Illustrator",
    image: "/assets/apps/ai.png",
  },
  {
    id: 4,
    title: "Premiere Pro",
    image: "/assets/apps/pr.png",
  },
  {
    id: 5,
    title: "Lightroom",
    image: "/assets/apps/lr.png",
  },
  {
    id: 6,
    title: "Photoshop",
    image: "/assets/apps/ps.png",
  },
  {
    id: 7,
    title: "3ds Max",
    image: "/assets/apps/3dsmax.png",
  },
  {
    id: 8,
    title: "Arnold",
    image: "/assets/apps/arnold.png",
  },
  {
    id: 9,
    title: "Inventor",
    image: "/assets/apps/inventor.png",
  },
  {
    id: 10,
    title: "Maya",
    image: "/assets/apps/maya.png",
  },
  {
    id: 11,
    title: "AutoCAD",
    image: "/assets/apps/autocad.png",
  },
  {
    id: 12,
    title: "Revit",
    image: "/assets/apps/revit.png",
  },
];

export const steps = [
  { id: 1, title: "Budget", label: "Set your budget" },
  { id: 2, title: "Games", label: "Choose games" },
  { id: 3, title: "Type", label: "Select type" },
  { id: 4, title: "Brands", label: "Pick brands" },
  { id: 5, title: "Results", label: "View results" },
];

export const steps2 = [
  { id: 1, title: "Budget", label: "Set your budget" },
  { id: 2, title: "Tasks", label: "Choose games" },
  { id: 3, title: "Form Factor", label: "Select type" },
  { id: 4, title: "Brands", label: "Pick brands" },
  { id: 5, title: "Results", label: "View results" },
];
