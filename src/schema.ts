export interface File {
    id: number;
    name: string;
    path: string;
    size: number;
    type: string;
    description: string | null;
    lastUpdated: Date;
  }
  
  export type InsertFile = Omit<File, 'id' | 'lastUpdated'>;