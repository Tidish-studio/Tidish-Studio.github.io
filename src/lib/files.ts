export interface SpellResource {
  id: number;
  name: string;
  description: string;
  lastUpdated: Date;
  url: string;
}

const downloadUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}downloads/${filename}`;

export const files: SpellResource[] = [
  {
    id: 1,
    name: "All The Spells",
    description: "All the official spells",
    lastUpdated: new Date("2025-02-25"),
    url: downloadUrl("dnd-spells-5e-2014.json"),
  },
  {
    id: 2,
    name: "All The Spells 2024",
    description: "All The Spells with 2024 (only use with the newest app version)",
    lastUpdated: new Date("2025-02-25"),
    url: downloadUrl("dnd-spells-5e-2024.json"),
  },
];
