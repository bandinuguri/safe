
export enum CaseType {
  EXCELLENCE = 'EXCELLENCE',
  GENERAL = 'GENERAL',
  ACCIDENT25 = 'ACCIDENT25'
}

export interface CaseImage {
  url: string;
  label?: string;
}

export interface Case {
  id: number;
  type: CaseType;
  title: string;
  company: string;
  airport: string;
  date: string;
  content: string;
  cause: string[];
  countermeasure: string[];
  피해상황?: string[];
  effect?: string;
  imageAlt?: string;
  imageUrl?: string;
  images?: CaseImage[];
  footerImages?: CaseImage[];
  location?: string;
}

export interface SafetyGoal {
  category: string;
  subCategory: string;
  target: string;
}

export interface YearStat {
  year: string;
  flights: number;
  accidents: number;
  rate: number;
}

export interface AirportStat {
  name: string;
  count: number;
  percentage: number;
}
