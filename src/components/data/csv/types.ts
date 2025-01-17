export type ImportStatus = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
};