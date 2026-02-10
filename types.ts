
export enum CaseType {
  EXCELLENCE = 'EXCELLENCE',
  GENERAL = 'GENERAL'
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
  effect?: string;
  imageAlt?: string;
  imageUrl?: string; // 단일 이미지 (하위 호환)
  images?: CaseImage[]; // 상세 내용 내 다중 이미지
  footerImages?: CaseImage[]; // 하단(대책 아래) 다중 이미지
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
