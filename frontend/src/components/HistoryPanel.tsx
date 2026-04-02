import type { AnalysisSummary } from '@/lib/api'

interface HistoryPanelProps {
  history: AnalysisSummary[]
  isLoading: boolean
}

export function HistoryPanel({ history, isLoading }: HistoryPanelProps) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 0' }}>
        <div style={{
          width: '14px', height: '14px',
          border: '1.5px solid var(--amber-200)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{ fontSize: '12px', color: 'var(--stone-500)' }}>Chargement...</span>
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <p style={{ fontSize: '12px', color: 'var(--stone-400)', padding: '12px 0' }}>
        Aucune analyse pour l'instant.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {history.map(item => (
        <div key={item.id} style={{
          background: 'var(--stone-50)',
          border: '0.5px solid var(--stone-200)',
          borderRadius: '10px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: '13px', fontWeight: 500,
              color: 'var(--stone-700)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {item.filename}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--stone-400)', marginTop: '2px' }}>
              {new Date(item.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
              })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            <span style={{
              fontSize: '11px', fontWeight: 500,
              background: 'var(--amber-50)',
              color: 'var(--amber-600)',
              border: '0.5px solid var(--amber-100)',
              borderRadius: '6px',
              padding: '2px 7px',
            }}>
              {item.row_count} lignes
            </span>
            <span style={{
              fontSize: '11px', fontWeight: 500,
              background: 'var(--stone-100)',
              color: 'var(--stone-500)',
              border: '0.5px solid var(--stone-200)',
              borderRadius: '6px',
              padding: '2px 7px',
            }}>
              {item.column_count} col.
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}