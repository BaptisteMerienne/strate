from pydantic import BaseModel
from typing import List, Dict, Any, Optional


class ColumnInfo(BaseModel):
    name: str
    type: str
    null_count: int
    unique_count: int
    sample_values: List[Any]


class DatasetAnalysis(BaseModel):
    filename: str
    row_count: int
    column_count: int
    columns: List[ColumnInfo]
    preview: List[Dict[str, Any]]


class AnalysisWithInsights(BaseModel):
    analysis: DatasetAnalysis
    insights: str


class AnalysisSummary(BaseModel):
    id: str
    created_at: str
    filename: str
    row_count: int
    column_count: int
    insights: str
