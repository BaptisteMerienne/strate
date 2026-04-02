import { useState, useEffect } from "react";
import { uploadCSV, getHistory } from "@/lib/api";
import type { AnalysisWithInsights, AnalysisSummary } from "@/lib/api";
import { UploadZone } from "@/components/UploadZone";
import { Charts } from "@/components/Charts";
import { InsightsPanel } from "@/components/InsightsPanel";
import { HistoryPanel } from "@/components/HistoryPanel";

export default function App() {
  const [result, setResult] = useState<AnalysisWithInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisSummary[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .finally(() => setHistoryLoading(false));
  }, []);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await uploadCSV(file);
      setResult(data);
      getHistory().then(setHistory);
    } catch (err) {
      setError("Une erreur est survenue lors de l'analyse.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--stone-100)" }}>
      <header
        style={{
          background: "var(--stone-50)",
          borderBottom: "0.5px solid var(--stone-200)",
          padding: "0 24px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              background: "var(--amber-200)",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "var(--amber-800)",
                borderRadius: "2px",
              }}
            />
          </div>
          <span
            style={{
              fontWeight: 600,
              fontSize: "15px",
              color: "var(--stone-800)",
              letterSpacing: "-0.02em",
            }}
          >
            Strate
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--stone-500)",
              marginTop: "1px",
            }}
          >
            dashboard analytique IA
          </span>
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 500,
            background: "var(--amber-50)",
            color: "var(--amber-600)",
            border: "0.5px solid var(--amber-100)",
            borderRadius: "20px",
            padding: "3px 10px",
          }}
        >
          IA · Mistral
        </div>
      </header>

      <main
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}
      >
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "var(--stone-800)",
                letterSpacing: "-0.03em",
                marginBottom: "6px",
              }}
            >
              Analyse ton CSV
            </h1>
            <p style={{ fontSize: "14px", color: "var(--stone-500)" }}>
              Upload un fichier et obtiens des visualisations + insights générés
              par IA
            </p>
          </div>

          {result && (
            <button
              onClick={() => {
                setResult(null);
                setError(null);
              }}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--stone-600)",
                background: "var(--stone-50)",
                border: "0.5px solid var(--stone-300)",
                borderRadius: "8px",
                padding: "8px 14px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--stone-200)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--stone-50)")
              }
            >
              ↩ Nouveau fichier
            </button>
          )}
        </div>

        <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />

        {error && (
          <div
            style={{
              marginTop: "16px",
              background: "#FEF2F2",
              border: "0.5px solid #FECACA",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#DC2626" }}>{error}</p>
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "32px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.6fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <InsightsPanel
              insights={result.insights}
              filename={result.analysis.filename}
              rowCount={result.analysis.row_count}
              columnCount={result.analysis.column_count}
            />
            <Charts
              columns={result.analysis.columns}
              preview={result.analysis.preview}
            />
          </div>
        )}
        <div
          style={{
            marginTop: "48px",
            borderTop: "0.5px solid var(--stone-200)",
            paddingTop: "32px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--stone-500)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Historique
          </p>
          <HistoryPanel history={history} isLoading={historyLoading} />
        </div>
      </main>
    </div>
  );
}
