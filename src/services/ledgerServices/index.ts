import { ledgerRoutes } from '@/routes/api';
import { LedgerAxios } from '../dataServices/axios';
import type { DeployMultisigResponse } from '@/@types/multisig';
// import type { TContractRulesForm, TSupportedBlockchainForm } from '@/lib/schemas/multisig';
import type { TTotalTokenSupplyRequest, TTotalTokenSupplyResponse } from '@/@types/userAssetContracts';

// Define an intersection type that combines SchemaA and SchemaB
// type TCreateMultisigParameters = TSupportedBlockchainForm & TContractRulesForm;

export const deployMultisigContract = async (data: any) => {
  const result: DeployMultisigResponse = await LedgerAxios.post(ledgerRoutes.deployMultisigContract, data);
  return result.response;
};

export const updateMinSignatures = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.updateMinSignatures, data);
  return result;
};

export const getTransactionCount = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.getTransactionCount, data);
  return result;
};

export const deployTPlusContract = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.deployTPlusContract, data);
  return result;
};

export const creationBasket = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.creationBasket, data);
  return result;
};

export const getMultisigTransactionCount = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.getMultisigTransactionCount, data);
  return result;
};

export const addMultisigSigner = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.addMultisigSigner, data);
  return result;
};

export const removeMultisigSigner = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.removeMultisigSigner, data);
  return result;
};

export const approveTransaction = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.approveTransaction, data);
  return result;
};

export const rejectTransaction = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.rejectTransaction, data);
  return result;
};

export const getTotalTokenSupply = async (data: TTotalTokenSupplyRequest) => {
  const result: TTotalTokenSupplyResponse = await LedgerAxios.post(ledgerRoutes.getTotalTokenSupply, data);
  return result.response;
};

export const redemptionBasket = async (data: any) => {
  const result = await LedgerAxios.post(ledgerRoutes.redemptionBasket, data);
  return result;
};
