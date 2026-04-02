interface InsightsPanelProps {
  insights: string;
  filename: string;
  rowCount: number;
  columnCount: number;
}

export function InsightsPanel({
  insights,
  filename,
  rowCount,
  columnCount,
}: InsightsPanelProps) {
  const lines = insights
    .split("\n")
    .map((l) =>
      l
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/###?\s?/g, "")
        .replace(/^#+\s?/g, "")
        .replace(/`/g, "")
        .trim(),
    )
    .filter(Boolean);

  return (
    <div
      style={{
        background: "var(--stone-50)",
        border: "0.5px solid var(--stone-200)",
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        position: "sticky",
        top: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--amber-200)",
          }}
        />
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--stone-600)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Insights IA
        </span>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}
      >
        {[
          { value: rowCount, label: "lignes" },
          { value: columnCount, label: "colonnes" },
        ].map(({ value, label }) => (
          <div
            key={label}
            style={{
              background: "#E8D5A8",
              border: "0.5px solid #C9A96E",
              borderRadius: "10px",
              padding: "10px 14px",
            }}
          >
            <p
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#2C1A06",
                letterSpacing: "-0.02em",
              }}
            >
              {value}
            </p>
            <p style={{ fontSize: "11px", color: "#8B5E1A", marginTop: "2px" }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--stone-100)",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <p style={{ fontSize: "11px", color: "var(--stone-500)" }}>fichier</p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--stone-700)",
            marginTop: "2px",
          }}
        >
          {filename}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {lines.map((line, i) => (
          <p
            key={i}
            style={{
              fontSize: "13px",
              color: "var(--stone-600)",
              lineHeight: "1.6",
              borderLeft: line.startsWith("-")
                ? "2px solid var(--amber-100)"
                : "none",
              paddingLeft: line.startsWith("-") ? "10px" : "0",
            }}
          >
            {line.startsWith("-") ? line.slice(1).trim() : line}
          </p>
        ))}
      </div>
    </div>
  );
}
