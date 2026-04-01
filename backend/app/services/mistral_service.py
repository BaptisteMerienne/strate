import os
from mistralai.client.sdk import Mistral
from dotenv import load_dotenv
from app.models.analysis import DatasetAnalysis

load_dotenv()

client = Mistral(api_key=os.getenv("MISTRAL_API_KEY"))


def generate_insights(analysis: DatasetAnalysis) -> str:
    columns_description = "\n".join(
        [
            f"- {col.name} ({col.type}) : {col.unique_count} valeurs uniques, "
            f"{col.null_count} valeurs manquantes, "
            f"exemples : {', '.join(str(v) for v in col.sample_values)}"
            for col in analysis.columns
        ]
    )

    preview_description = "\n".join([str(row) for row in analysis.preview[:3]])

    prompt = f"""Tu es un analyste de données expert. Analyse ce dataset et génère un résumé clair et actionnable en français.

Dataset : {analysis.filename}
Nombre de lignes : {analysis.row_count}
Nombre de colonnes : {analysis.column_count}

Colonnes disponibles :
{columns_description}

Aperçu des premières lignes :
{preview_description}

Génère un résumé structuré avec :
1. Une description générale du dataset en une phrase
2. Les 3 insights les plus intéressants
3. Une recommandation d'analyse à approfondir

Sois concis, précis et utile. Réponds uniquement en français."""

    response = client.chat.complete(
        model="mistral-small-latest", messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
