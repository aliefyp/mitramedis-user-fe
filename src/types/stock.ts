export interface StockType {
  item_name: string;
  item_code: number;
  unit: string;
  category: string;
  purchase_price: number;
  selling_price: number;
  bpjs_price: number;
  minimum_stock: number;
  supplier: string;
}

export interface StockEntryType extends StockType {
  invoice: string;
  created_date: string;
  supplier: string;
  quantity: number;
  expired_date: string;
}