import { fetchFromGAS, postToGAS } from './gas-client';

export interface SalesData {
  date: string;
  salesPerson: string;
  approaches: number;
  appointments: number;
  meetings: number;
  trials: number;
  contracts: number;
}

export interface ProspectData {
  companyName: string;
  contactPerson: string;
  status: string;
  nextAction: string;
  nextActionDate: string;
  amount: number;
  salespersonId: string;
}

export async function getSalesData(): Promise<SalesData[]> {
  try {
    const response = await fetchFromGAS();
    if (!response.success) {
      throw new Error('Failed to fetch sales data');
    }
    return response.data?.sales || [];
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
}

export async function getProspects(): Promise<ProspectData[]> {
  try {
    const response = await fetchFromGAS();
    if (!response.success) {
      throw new Error('Failed to fetch prospects');
    }
    return response.data?.prospects || [];
  } catch (error) {
    console.error('Error fetching prospects:', error);
    return [];
  }
}

export async function addSalesData(data: SalesData): Promise<void> {
  try {
    const response = await postToGAS('sales', data);
    if (!response.success) {
      throw new Error(response.message || 'Failed to add sales data');
    }
  } catch (error) {
    console.error('Error adding sales data:', error);
    throw error;
  }
}

export async function addProspect(data: ProspectData): Promise<void> {
  try {
    const response = await postToGAS('prospects', data);
    if (!response.success) {
      throw new Error(response.message || 'Failed to add prospect');
    }
  } catch (error) {
    console.error('Error adding prospect:', error);
    throw error;
  }
} 