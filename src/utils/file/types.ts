export type FileType = 'excel' | 'csv';

export interface FileProcessingOptions {
  encoding?: string;
  delimiter?: string;
  skipRows?: number;
}