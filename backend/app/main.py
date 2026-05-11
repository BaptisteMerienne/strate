from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analysis

app = FastAPI(title="Strate API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://strate.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis.router)


@app.get("/")
async def root():
    return {"message": "Strate API is running"}
