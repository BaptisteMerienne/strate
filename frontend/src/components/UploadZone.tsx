import { useCallback, useState } from 'react'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  isLoading: boolean
}

export function UploadZone({ onFileSelect, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file?.name.endsWith('.csv')) {
        onFileSelect(file)
      }
    },
    [onFileSelect]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

   return (
    <label style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '160px',
      border: `2px dashed ${isDragging ? 'var(--amber-200)' : 'var(--stone-300)'}`,
      borderRadius: '14px',
      background: isDragging ? 'var(--amber-50)' : 'var(--stone-50)',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      opacity: isLoading ? 0.6 : 1,
      transition: 'all 0.15s ease',
    }}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleChange}
        disabled={isLoading}
      />
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px',
            border: '2px solid var(--amber-200)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <span style={{ fontSize: '13px', color: 'var(--amber-600)', fontWeight: 500 }}>
            Analyse en cours...
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'var(--amber-50)',
            border: '0.5px solid var(--amber-100)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="var(--amber-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--stone-700)' }}>
              Glisse ton CSV ici
            </p>
            <p style={{ fontSize: '12px', color: 'var(--stone-500)', marginTop: '2px' }}>
              ou clique pour parcourir · max 10MB
            </p>
          </div>
        </div>
      )}
    </label>
  )
}