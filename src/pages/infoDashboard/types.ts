export interface SelectTimeOption {
  label: string,
  value: string
}

export type ArrayKeys<T extends readonly { value: string }[]> = 
  T[number]['value']

export interface DataType {
  id: number;
  title: string;
  time: string;
  source: string;
  classify: string;
  describe?: string;
  subTitleList: string[]
}