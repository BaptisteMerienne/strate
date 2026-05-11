import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

export interface ColumnInfo {
  name: string;
  type: "text" | "number" | "boolean";
  null_count: number;
  unique_count: number;
  sample_values: (string | number | boolean)[];
}

export interface DatasetAnalysis {
  filename: string;
  row_count: number;
  column_count: number;
  columns: ColumnInfo[];
  preview: Record<string, string | number | boolean>[];
}

export interface AnalysisWithInsights {
  analysis: DatasetAnalysis;
  insights: string;
}

export async function uploadCSV(file: File): Promise<AnalysisWithInsights> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<AnalysisWithInsights>(
    "/api/analysis/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return response.data;
}

export interface AnalysisSummary {
  id: string;
  created_at: string;
  filename: string;
  row_count: number;
  column_count: number;
  insights: string;
}

export async function getHistory(): Promise<AnalysisSummary[]> {
  const response = await api.get<AnalysisSummary[]>("/api/analysis/history");
  return response.data;
}
