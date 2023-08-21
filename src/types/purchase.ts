export interface PurchaseType {
  invoice: string
  date: string
  supplier_id: number
  stock: Stock[]
}

export interface Stock {
  stock_id: number
  qty: number
  cogs: number
  sales_price: number
  total: number
  expired_date: string
}

export interface PurchaseFormType extends Omit<PurchaseType, 'stock'>, Stock {
  code: string;
  unit: string;
  stock_string: string;
  supplier_string: string;
}