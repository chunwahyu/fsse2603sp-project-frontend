import axios from "axios";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";
import type {CartItemDto} from "../data/cartItem/cartItem.type.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getUserCart() {
  const response = await axios.get<CartItemDto[]>(
      `${baseUrl}/cart/items`,
      await getAuthConfig()
  );
  return response.data;
}

export async function putCartItem(pid: number, quantity: number) {
  await axios.put(
      `${baseUrl}/cart/items/${pid}/${quantity}`,
      null,
      await getAuthConfig()
  );
}

export async function patchCartItemQuantity(pid: number, quantity: number) {
  await axios.patch(
      `${baseUrl}/cart/items/${pid}/${quantity}`,
      null,
      await getAuthConfig()
  );
}

export async function deleteCartItem(pid: number) {
  await axios.delete(
      `${baseUrl}/cart/items/${pid}`,
      await getAuthConfig()
  );
}