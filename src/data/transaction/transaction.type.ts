export interface TransactionDto {
  tid:      number;
  buyerUid: number;
  datetime: string;
  status:   string;
  total:    number;
  items:    TransactionItem[];
}

export interface TransactionItem {
  tpid:     number;
  product:  TransactionProduct;
  quantity: number;
  subTotal: number;
}

export interface TransactionProduct {
  pid:          number;
  name:         string;
  description:  string;
  imageUrl:     string;
  price:        number;
  stock:        number;
}