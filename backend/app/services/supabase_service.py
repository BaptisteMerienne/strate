import os
from supabase import create_client, Client
from dotenv import load_dotenv
from app.models.analysis import DatasetAnalysis

load_dotenv()


def get_client() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    return create_client(url, key)


def save_analysis(analysis: DatasetAnalysis, insights: str) -> str:
    client = get_client()

    data = {
        "filename": analysis.filename,
        "row_count": analysis.row_count,
        "column_count": analysis.column_count,
        "columns": [col.model_dump() for col in analysis.columns],
        "insights": insights,
    }

    # try:
    #     response = client.table("analyses").insert(data).execute()
    #     print("Supabase response:", response)
    #     return response.data[0]["id"]
    # except Exception as e:
    #     print("Supabase error:", e)
    #     raise

    response = client.table("analyses").insert(data).execute()
    return response.data[0]["id"]


def get_analyses() -> list:
    client = get_client()
    response = (
        client.table("analyses")
        .select("id, created_at, filename, row_count, column_count, insights")
        .order("created_at", desc=True)
        .limit(10)
        .execute()
    )
    return response.data
