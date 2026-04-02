import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { ColumnInfo } from "@/lib/api";

const AMBER_SHADES = ["#BA7517", "#EF9F27", "#FAC775", "#854F0B", "#633806"];

interface ChartsProps {
  columns: ColumnInfo[];
  preview: Record<string, string | number | boolean>[];
}

export function Charts({ columns, preview }: ChartsProps) {
  const numberColumns = columns.filter((col) => col.type === "number");
  const textColumns = columns.filter((col) => {
    if (col.type !== "text") return false;
    if (col.unique_count > 8) return false;
    if (col.unique_count / preview.length > 0.5) return false;
    return true;
  });
  const labelColumn = columns.find((col) => col.type === "text");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {numberColumns.map((col) => (
        <div
          key={col.name}
          style={{
            background: "var(--stone-50)",
            border: "0.5px solid var(--stone-200)",
            borderRadius: "14px",
            padding: "20px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--stone-500)",
              marginBottom: "16px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {col.name}
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={preview} barSize={28}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--stone-200)"
                vertical={false}
              />
              <XAxis
                dataKey={labelColumn?.name}
                tick={{ fontSize: 11, fill: "var(--stone-500)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--stone-500)" }}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--stone-50)",
                  border: "0.5px solid var(--stone-200)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "var(--stone-700)",
                }}
                cursor={{ fill: "#F2E8D5" }}
              />
              <Bar dataKey={col.name} fill="#C17D2A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}

      {textColumns.map((col) => {
        const counts: Record<string, number> = {};
        preview.forEach((row) => {
          const val = String(row[col.name]);
          counts[val] = (counts[val] || 0) + 1;
        });
        const data = Object.entries(counts).map(([name, value]) => ({
          name,
          value,
        }));

        return (
          <div
            key={col.name}
            style={{
              background: "var(--stone-50)",
              border: "0.5px solid var(--stone-200)",
              borderRadius: "14px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--stone-500)",
                marginBottom: "16px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {col.name} — répartition
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ percent }) =>
                    `${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={AMBER_SHADES[index % AMBER_SHADES.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
}
