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

export interface StockPurchaseType extends StockType {
  invoice: string;
  created_date: string;
  supplier: string;
  quantity: number;
  expired_date: string;
}

export interface StockCardType {
  stock_card_id: string;
  prescription_id: string;
  stock_id: string;
  qty: string;
  source: string;
  created_at: string;
}