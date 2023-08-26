export interface Icd9cmResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  icd9cm: Icd9cm[]
}

export interface Icd9cm {
  icd9cm_id: string
  code: string
  label: string
  category: string
}