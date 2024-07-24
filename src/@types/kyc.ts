import type { UniqueIdentifier } from '@dnd-kit/core';

export interface IField {
  id: string;
  formItemType: string;
  label: string;
  required: boolean;
  placeholder: string;
}

export interface IBlock {
  alias: string;
  description: string;
  note: string;
  fields: Array<IField>;
}
export interface ICustomBlock {
  order: number;
  block: IBlock;
}

export type DroppedItem = {
  id: UniqueIdentifier;
  order: number;
  block: IBlock;
};
export interface IKYCTemplate {
  investorType: string;
  permittedJurisdiction: Array<string>;
  blockedJurisdiction: Array<string>;
  customBlocks: Array<ICustomBlock>;
}
