import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import type { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import type { SDKProvider } from '@metamask/sdk';
export declare type Maybe<Type> = Partial<Type> | null | undefined;

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

// Check if the token is valid or expired
export const isTokenValid = (accessToken: string | undefined): boolean => {
  try {
    if (accessToken === undefined) return false;
    const decodedToken = JSON.parse(atob(accessToken?.split('.')[1])) as { exp: number };
    const expirationTime = decodedToken.exp * 1000 || 0;
    const currentTime = Date.now();
    if (expirationTime < currentTime) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Format Date
export const formatDate = (date = '', format = 'YYYY-MM-DD') => {
  if (!date) return '';
  return dayjs(date).format(format);
};
// Format Number
export const formatNumber = (number_: string | number) => {
  if (number_ && !Number.isNaN(number_)) {
    const separatorCode = String(number_);
    return separatorCode.replaceAll(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  return number_;
};

// Convert file to base64
export function imageFileToBase64(imageFile: Blob | null): Promise<string | null> {
  if (!imageFile) {
    return Promise.resolve(null);
  }

  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(imageFile);
    reader.addEventListener('load', () => {
      resolve(reader.result as string);
    });
    reader.addEventListener('error', (error) => {
      reject(error);
    });
  });
}

// Convert base64 to file
export function base64ToImageFile(base64Data: string): Blob | null {
  // Check for valid base64 string
  if (!base64Data) {
    return null;
  }

  try {
    // Split data URI (optional) and extract base64 data
    const dataParts = base64Data.split(',');
    const contentType = dataParts[0]?.split(':')[1].trim() || '';
    base64Data = dataParts[1] || '';

    // Decode base64 data
    const decodedData = atob(base64Data);

    // Create an in-memory file object
    const blob = new Blob([decodedData], { type: contentType });

    return blob;
  } catch (error) {
    console.error('Error converting base64 to image:', error);
    return null;
  }
}

// Get Image Data
export const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  [...event.target.files!].forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
};

export const isConfirmTransaction = (provider: SDKProvider, transactionHex: Maybe<unknown>) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      console.log(transactionHex);
      const transaction = await provider.request({ method: 'eth_getTransactionReceipt', params: [transactionHex] });
      if (transaction) {
        if (!transaction) {
          clearInterval(interval);
          reject(new Error('Transaction failed'));
        }
        clearInterval(interval);
        resolve(transaction);
      }
    }, 5000);
  });
};

export const camelCaseFormatter = (string: string) => {
  return string
    .split('-')
    .join(' ')
    .toLowerCase()
    .replaceAll(/[^\dA-Za-z]+(.)/g, (_, chr) => chr.toUpperCase());
};
