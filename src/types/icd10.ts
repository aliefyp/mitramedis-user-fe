export interface Icd10Param {
  userId: string;
  clinicId: string;
  token: string;
}

export interface Icd10Response {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  icd10: Icd10[]
}

export interface Icd10 {
  level: string
  code: string
  label: string
  child: Child[]
}

export interface Child {
  parent: string
  level: string
  code: string
  label: string
  child: Child2[]
}

export interface Child2 {
  level: string
  code: string
  label: string
  child: Child3[]
}

export interface Child3 {
  level: string
  code: string
  label: string
}