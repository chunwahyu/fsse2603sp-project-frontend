import type {GetAllProductDto, ProductDetailDto} from "../data/product/ProductDto.type.ts";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getAllProduct() {
  const response = await axios.get<GetAllProductDto[]>(`${baseUrl}/public/products`);
  return response.data;
}

export async function getProductByPid(pid:string) {
  const response = await axios.get<ProductDetailDto>(`${baseUrl}/public/products/${pid}`);
  return response.data;
}