export interface StockType {
  stock_id: string;
  clinic_id: string;
  type: string;
  code: string;
  item_name: string;
  description: string;
  unit: string;
  cogs: string;
  sales_price: string;
  expired_date: string;
  current_stock: string;
  status: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  supplier: string;
  minimum_stock: number;
}

export interface StockEntryType extends StockType {
  invoice: string;
  created_date: string;
  supplier: string;
  quantity: number;
  expired_date: string;
}