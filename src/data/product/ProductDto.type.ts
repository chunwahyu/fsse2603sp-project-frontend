export interface GetAllProductDto {
  pid:      number;
  name:     string;
  imageUrl: string;
  price:    number;
  hasStock: boolean;
}

export interface ProductDetailDto {
  pid:          number;
  name:         string;
  description:  string;
  imageUrl:     string;
  price:        number;
  stock:        number;
}