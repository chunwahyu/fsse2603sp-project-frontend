import type {TransactionDto} from "../data/transaction/transaction.type.ts";
import axios from "axios";
import {getAuthConfig} from "../authService/FirebaseAuthService.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getTransactionByTid(tid: string) {
  const response = await axios.get<TransactionDto>(
      `${baseUrl}/transactions/${tid}`,
      await getAuthConfig()
  );
  return response.data;
}

export async function prepareTransaction() {
  const response = await axios.post<TransactionDto>(
      `${baseUrl}/transactions`,
      null,
      await getAuthConfig()
  );
  return response.data;
}

export async function processTransactionByTid(tid: string) {
  await axios.patch(
      `${baseUrl}/transactions/${tid}/payment`,
      null,
      await getAuthConfig()
  );
}

export async function successTransactionByTid(tid: string) {
  await axios.patch(
      `${baseUrl}/transactions/${tid}/success`,
      null,
      await getAuthConfig()
  );
}