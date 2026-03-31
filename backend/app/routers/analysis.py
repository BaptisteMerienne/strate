from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.analysis_service import analyse_csv
from app.models.analysis import DatasetAnalysis

router = APIRouter(prefix="/api/analysis", tags=["analysis"])


@router.post("/upload", response_model=DatasetAnalysis)
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Le fichier doit être un CSV")

    content = await file.read()

    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=400, detail="Fichier trop volumineux (max 10MB)"
        )

    try:
        result = analyse_csv(content, file.filename)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erreur lors de l'analyse : {str(e)}"
        )
