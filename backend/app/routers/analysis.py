from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.analysis_service import analyse_csv
from app.services.mistral_service import generate_insights
from app.models.analysis import DatasetAnalysis, AnalysisWithInsights

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
        return AnalysisWithInsights(analysis=analysis, insights=insights)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erreur lors de l'analyse : {str(e)}"
        )
