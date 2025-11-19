export enum View {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
}

export type DeploymentStatus = 'Live' | 'Building' | 'Failed' | 'Queued';

export interface Deployment {
  id: string;
  project: string;
  commit: string;
  branch: string;
  status: DeploymentStatus;
  time: string;
  author: string;
}

export interface StatMetric {
  label: string;
  value: string;
  change: number; // percentage
  data: number[]; // for sparkline
}

export interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'error' | 'info';
}