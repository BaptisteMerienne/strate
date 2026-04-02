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
    <div style={{ minHeight: "100vh", background: "var(--stone-100)" }}>
      <header
        style={{
          background: "#FAF5EC",
          borderBottom: "0.5px solid #D4BC90",
          padding: "0 32px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "#C17D2A",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: "#FAF5EC",
                borderRadius: "2px",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <span
              style={{
                fontWeight: 900,
                fontSize: "18px",
                color: "#2C1A06",
                letterSpacing: "-0.03em",
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1,
              }}
            >
              Strate
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#8B5E1A",
                borderLeft: "1px solid #D4BC90",
                paddingLeft: "10px",
                lineHeight: 1,
              }}
            >
              dashboard analytique IA
            </span>
          </div>
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 500,
            background: "#EFE4C8",
            color: "#8B5E1A",
            border: "0.5px solid #C9A96E",
            borderRadius: "20px",
            padding: "4px 12px",
          }}
        >
          IA · Mistral
        </div>
      </header>

      <main
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}
      >
        {!result ? (
          <>
            <div
              style={{
                background: "#E8D5A8",
                border: "1.5px solid #C17D2A",
                borderRadius: "16px",
                padding: "36px 40px",
                marginBottom: "32px",
              }}
            >
              <div style={{ maxWidth: "520px", marginBottom: "28px" }}>
                <h1
                  style={{
                    fontSize: "38px",
                    fontWeight: 900,
                    color: "var(--amber-900)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.05,
                    marginBottom: "12px",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Tes données,
                  <br />
                  révélées.
                </h1>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--amber-700)",
                    lineHeight: 1.7,
                  }}
                >
                  Upload un CSV et obtiens des visualisations automatiques et
                  des insights générés par IA en quelques secondes.
                </p>
              </div>

              <UploadZone
                onFileSelect={handleFileSelect}
                isLoading={isLoading}
              />

              <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                {[
                  {
                    label: "Auto-détection des colonnes",
                    desc: "Types, stats, valeurs manquantes",
                  },
                  {
                    label: "Visualisations automatiques",
                    desc: "Bar charts et pie charts par type",
                  },
                  {
                    label: "Insights générés par Mistral",
                    desc: "Résumé IA des tendances clés",
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--amber-400)",
                        marginTop: "5px",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--amber-900)",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "var(--amber-700)",
                          marginTop: "1px",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: "#FEF2F2",
                  border: "0.5px solid #FECACA",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "24px",
                }}
              >
                <p style={{ fontSize: "13px", color: "#DC2626" }}>{error}</p>
              </div>
            )}

            <div
              style={{
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
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "28px",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--stone-800)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {result.analysis.filename}
                </h2>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--stone-500)",
                    marginTop: "2px",
                  }}
                >
                  Analyse terminée
                </p>
              </div>
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
            </div>

            <div
              style={{
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
          </>
        )}
      </main>
    </div>
  );
}
