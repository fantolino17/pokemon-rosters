export interface GridItem {
  name: string;
};

export interface GridItemDetail {
  id: string;
  name: string;
  types: string[];
  imageUrl: string;  
};

export type InfoBanner = {
  severity: 'error' | 'success' | 'info' | 'warning';
  message: string;
} | null;
