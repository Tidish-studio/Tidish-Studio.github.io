export interface File {
    id: number;
    name: string;
    type: string;
    description: string | null;
    lastUpdated: Date;
  }
  
  export type InsertFile = Omit<File, 'id' | 'lastUpdated'>;