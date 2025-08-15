Mini Project Management System

A multi-tenant project management tool built with Django + GraphQL on the backend and React + TypeScript on the frontend.
Implements organization-based data isolation, project/task management, commenting system, and basic statistics.

🚀 Tech Stack

Backend

Django 4.x

Graphene-Django (GraphQL)

PostgreSQL

Docker

Frontend

React 18+

TypeScript

Apollo Client

TailwindCSS

Vite

CI/CD

GitHub Actions (Backend tests + Frontend build)

📦 Features
Backend (Django + GraphQL)

Multi-tenant data isolation via Organization context

CRUD for Projects and Tasks

Commenting system on tasks

Project statistics (task counts, completion rates)

GraphQL schema with filtering/search

Frontend (React + TypeScript)

Project dashboard with status indicators

Task management with create/update flows

Comment system for tasks

Apollo Client integration with optimistic updates

Responsive UI with TailwindCSS

🗂 Project Structure
.
├── backend/             # Django backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   └── <app code>
├── frontend/            # React frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── .github/workflows/ci.yml
└── README.md

⚙️ Setup & Installation
Prerequisites

Docker & Docker Compose

Node.js >= 20

Python >= 3.11 (for local backend dev)

1️⃣ Clone Repository
git clone https://github.com/Dhruvagwal/VoiceAIWrapperScreening.git
cd VoiceAIWrapperScreening

2️⃣ Environment Variables

Create .env in the backend directory:

DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
SECRET_KEY=your-secret-key
DEBUG=True


For frontend (optional .env):

VITE_API_URL=http://localhost:8000/graphql/

3️⃣ Run with Docker Compose
docker-compose up --build


Backend → http://localhost:8000/graphql

Frontend → http://localhost:5173

4️⃣ Run Locally Without Docker

Backend

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Frontend

cd frontend
npm install
npm run dev

📡 GraphQL API

GraphQL Playground is available at:

http://localhost:8000/graphql

Example Query: List Projects
query {
  projects {
    id
    name
    status
    taskCount
    completedTasks
  }
}

Example Mutation: Add Task Comment
mutation {
  addTaskComment(taskId: 1, content: "This is a test comment", authorEmail: "test@example.com") {
    ok
    comment {
      id
      content
      timestamp
    }
  }
}


Required Headers:

X-Org-Slug: your-org-slug

📊 Project Statistics

Example query:

query {
  projectStatistics {
    totalProjects
    completionRate
    tasksByStatus {
      status
      count
    }
  }
}

🧪 Running Tests

Backend

python manage.py test


CI/CD

On push to main, GitHub Actions will:

Run backend migrations and tests

Build frontend

🔮 Future Improvements

Real-time updates with GraphQL subscriptions

Advanced filtering and sorting

Drag-and-drop task management

Comprehensive test coverage

Mobile-optimized UI

Role-based permissions

📜 License

MIT License

This is now the complete README in one go, so you can paste it directly into README.md in your repo without anything getting cut off.

Do you also want me to add the generated GraphQL schema section right after the API examples so the reviewer can see all queries/mutations without running it? That would make it even stronger.