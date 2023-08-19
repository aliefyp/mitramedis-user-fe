export interface KfaType {
  id: number
  name: string
  display_name: string
  kfa_code: string
  nama_dagang: string
  dosage_form: string
  manufacturer: string
  uom_id: string
  active_ingredients: ActiveIngredient[]
  dosage_usage: DosageUsage[]
  updated_at: string
}

export interface ActiveIngredient {
  name: string
  display_name: string
  dosage: string
}

export interface DosageUsage {
  name: string
  display_name: string
  category: string
  body_weight_max: number
  body_weight_min: number
  duration: number
  duration_max: number
  duration_ucum: string
  frequency: number
  frequency_max: number
  period: number
  period_ucum: any
  qty: number
  qty_high: number
  qty_ucum: any
  qty_uom: any
  use_ucum: boolean
}
