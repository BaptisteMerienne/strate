# Strate — Dashboard analytique alimenté par IA

![Strate Dashboard](https://via.placeholder.com/1200x600/E8D5A8/2C1A06?text=Strate+Dashboard+Preview)

**Strate** transforme n'importe quel fichier CSV en rapport analytique complet en quelques secondes. Upload un fichier, obtiens des visualisations automatiques et des insights générés par IA.

🔗 **[Démo en ligne](https://strate.vercel.app)** · **[Backend API](https://strate-api.onrender.com/docs)**

---

## Fonctionnalités

- **Upload CSV** — glisse-dépose ou sélection de fichier, jusqu'à 10MB
- **Auto-détection** — types de colonnes, valeurs manquantes, statistiques descriptives
- **Visualisations automatiques** — bar charts pour les colonnes numériques, pie charts pour les colonnes catégorielles
- **Insights IA** — résumé structuré généré par Mistral : description, 3 insights clés, recommandation
- **Historique** — persistance des analyses via Supabase, consultable à tout moment

---

## Stack technique

### Frontend

| Outil                    | Usage                               |
| ------------------------ | ----------------------------------- |
| React + TypeScript       | Interface utilisateur               |
| Vite                     | Bundler et serveur de développement |
| Recharts                 | Visualisations graphiques           |
| shadcn/ui                | Composants UI                       |
| Axios                    | Appels HTTP                         |
| Playfair Display + Inter | Typographie                         |

### Backend

| Outil      | Usage                    |
| ---------- | ------------------------ |
| FastAPI    | Framework API REST       |
| pandas     | Parsing et analyse CSV   |
| Mistral AI | Génération des insights  |
| Supabase   | Persistance des analyses |
| uvicorn    | Serveur ASGI             |

### Infrastructure

| Service  | Usage                      |
| -------- | -------------------------- |
| Vercel   | Déploiement frontend       |
| Render   | Déploiement backend        |
| Supabase | Base de données PostgreSQL |

---

## Architecture

```
strate/
├── frontend/                  # React + Vite
│   └── src/
│       ├── components/
│       │   ├── UploadZone.tsx     # Zone de dépôt CSV
│       │   ├── Charts.tsx         # Graphiques Recharts
│       │   ├── InsightsPanel.tsx  # Panneau insights IA
│       │   └── HistoryPanel.tsx   # Historique des analyses
│       ├── lib/
│       │   └── api.ts             # Client Axios
│       └── App.tsx                # Page principale
│
└── backend/                   # FastAPI + Python
    └── app/
        ├── routers/
        │   └── analysis.py        # Routes /upload et /history
        ├── services/
        │   ├── analysis_service.py  # Analyse pandas
        │   ├── mistral_service.py   # Génération insights
        │   └── supabase_service.py  # Persistance
        └── models/
            └── analysis.py          # Schémas Pydantic
```

---

## Installation locale

### Prérequis

- Node.js 18+
- Python 3.12+
- Un compte [Mistral AI](https://console.mistral.ai) pour la clé API
- Un projet [Supabase](https://supabase.com)

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Crée un fichier `.env` dans `backend/` :

```env
MISTRAL_API_KEY=ta_clé_mistral
SUPABASE_URL=https://ton-projet.supabase.co
SUPABASE_KEY=ta_clé_anon
```

Lance le serveur :

```bash
uvicorn app.main:app --reload --port 8000
```

L'API est disponible sur `http://localhost:8000` · Documentation interactive : `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
```

Crée un fichier `.env.local` dans `frontend/` :

```env
VITE_API_URL=http://localhost:8000
```

Lance le serveur :

```bash
npm run dev
```

L'application est disponible sur `http://localhost:5173`

### Base de données

Dans le **SQL Editor** de Supabase, exécute :

```sql
create table analyses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  filename text not null,
  row_count integer not null,
  column_count integer not null,
  columns jsonb not null,
  insights text not null
);
```

---

## Déploiement

### Backend — Render

1. Crée un **Web Service** sur [render.com](https://render.com)
2. Connecte ton repo GitHub
3. Configure :
   - **Root Directory** : `backend`
   - **Build Command** : `pip install -r requirements.txt`
   - **Start Command** : `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Ajoute les variables d'environnement `MISTRAL_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`

### Frontend — Vercel

1. Importe le repo sur [vercel.com](https://vercel.com)
2. Configure :
   - **Root Directory** : `frontend`
   - **Framework** : Vite
3. Ajoute la variable d'environnement `VITE_API_URL` avec l'URL Render

---

## Auteur

**Baptiste Merienne** — Développeur web & IA  
[GitHub](https://github.com/BaptisteMerienne) · [LinkedIn](https://linkedin.com/in/baptiste-merienne)

---

_Projet 2/3 du portfolio — voir aussi [Veine](https://github.com/BaptisteMerienne/veine) (assistant documentaire RAG)_
