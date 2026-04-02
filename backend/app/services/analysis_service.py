import pandas as pd
import re
from io import BytesIO
from app.models.analysis import DatasetAnalysis, ColumnInfo


def clean_column_name(name: str) -> str:
    name = str(name).strip()
    name = re.sub(r"^[#@!$%^&*]+", "", name)
    name = name.strip()
    return name if name else "colonne_sans_nom"


def analyse_csv(file_content: bytes, filename: str) -> DatasetAnalysis:
    df = pd.read_csv(BytesIO(file_content))

    columns = []
    for col in df.columns:
        dtype = str(df[col].dtype)
        if dtype in ["int64", "float64"]:
            col_type = "number"
        elif dtype == "bool":
            col_type = "boolean"
        else:
            col_type = "text"

        sample = df[col].dropna().head(3).tolist()

        columns.append(
            ColumnInfo(
                name=col,
                type=col_type,
                null_count=int(df[col].isnull().sum()),
                unique_count=int(df[col].nunique()),
                sample_values=sample,
            )
        )

    preview = df.head(10).fillna("").to_dict(orient="records")

    return DatasetAnalysis(
        filename=filename,
        row_count=len(df),
        column_count=len(df.columns),
        columns=columns,
        preview=preview,
    )
