// Static list of demo files
export const files = [
  {
    id: 1,
    name: "All The Spells",
    path: "spells-all-new.json",
    size: 2539370,
    type: "application/json",
    description: "A comprehensive quick reference guide for all spells in the 5th Edition",
    lastUpdated: new Date("2024-02-15T14:30:00"),
  },
  {
    id: 2,
    name: "Spell Cards Template.xlsx",
    path: "/files/spell-cards.xlsx",
    size: 1200000,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    description: "Printable spell cards template for your spellcaster",
    lastUpdated: new Date("2024-02-16T09:15:00"),
  },
  {
    id: 3,
    name: "App User Guide.pdf",
    path: "/files/guide.pdf",
    size: 1500000,
    type: "application/pdf",
    description: "Complete guide for using the DnD Spells 5e mobile app",
    lastUpdated: new Date("2024-02-16T11:45:00"),
  },
];

// Sample file content for downloads
export const getFileContent = (id: number) => {
  return `This is sample content for the D&D Spells 5e supplementary resource (ID: ${id}).\n\nThis is a demo file for testing purposes.`;
};