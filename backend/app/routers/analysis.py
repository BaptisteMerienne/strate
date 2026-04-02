from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.analysis_service import analyse_csv
from app.services.mistral_service import generate_insights
from app.services.supabase_service import save_analysis, get_analyses
from app.models.analysis import DatasetAnalysis, AnalysisWithInsights, AnalysisSummary
from typing import List


router = APIRouter(prefix="/api/analysis", tags=["analysis"])


@router.post("/upload", response_model=AnalysisWithInsights)
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Le fichier doit être un CSV")

    content = await file.read()

    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=400, detail="Fichier trop volumineux (max 10MB)"
        )

    try:
        analysis = analyse_csv(content, file.filename)
        insights = generate_insights(analysis)
        analysis_id = save_analysis(analysis, insights)
        return AnalysisWithInsights(
            id=analysis_id, analysis=analysis, insights=insights
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erreur lors de l'analyse : {str(e)}"
        )


@router.get("/history", response_model=List[AnalysisSummary])
async def get_history():
    try:
        return get_analyses()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la récupération de l'historique : {str(e)}",
        )
