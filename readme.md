# Mini Project Management System

A multi-tenant project management tool built with **Django + GraphQL** on the backend and **React + TypeScript** on the frontend.  
Implements organization-based data isolation, project/task management, commenting system, and basic statistics.  

---

## 🚀 Tech Stack

**Backend**
- Django 4.x
- Graphene-Django (GraphQL)
- PostgreSQL
- Docker

**Frontend**
- React 18+
- TypeScript
- Apollo Client
- TailwindCSS
- Vite

**CI/CD**
- GitHub Actions (Backend tests + Frontend build)

---

## 📦 Features

### Backend (Django + GraphQL)
- Multi-tenant data isolation via `Organization` context
- CRUD for Projects and Tasks
- Commenting system on tasks
- Project statistics (task counts, completion rates)
- GraphQL schema with filtering/search

### Frontend (React + TypeScript)
- Project dashboard with status indicators
- Task management with create/update flows
- Comment system for tasks
- Apollo Client integration with optimistic updates
- Responsive UI with TailwindCSS

---

## 🗂 Project Structure

### Backend
```
📦backend
 ┣ 📂core
 ┃ ┣ 📂migrations
 ┃ ┃ ┣ 📜0001_initial.py
 ┃ ┃ ┗ 📜__init__.py
 ┃ ┣ 📂tests
 ┃ ┃ ┣ 📜test_graphql.py
 ┃ ┃ ┗ 📜test_models.py
 ┃ ┣ 📜admin.py
 ┃ ┣ 📜apps.py
 ┃ ┣ 📜filters.py
 ┃ ┣ 📜middleware.py
 ┃ ┣ 📜models.py
 ┃ ┗ 📜schema.py
 ┣ 📂project_mgmt
 ┃ ┣ 📜asgi.py
 ┃ ┣ 📜settings.py
 ┃ ┣ 📜urls.py
 ┃ ┣ 📜wsgi.py
 ┃ ┗ 📜__init__.py
 ┣ 📜docker-compose.yml
 ┣ 📜Dockerfile
 ┣ 📜manage.py
 ┣ 📜pyproject.toml
 ┣ 📜pytest.ini
 ┗ 📜requirements.txt
```

### Frontend
```
📦frontend
 ┣ 📂public
 ┃ ┗ 📜vite.svg
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂sidebar
 ┃ ┃ ┃ ┣ 📜app-sidebar.tsx
 ┃ ┃ ┃ ┣ 📜nav-documents.tsx
 ┃ ┃ ┃ ┣ 📜nav-main.tsx
 ┃ ┃ ┃ ┣ 📜nav-projects.tsx
 ┃ ┃ ┃ ┣ 📜nav-user.tsx
 ┃ ┃ ┃ ┗ 📜team-switcher.tsx
 ┃ ┃ ┣ 📂ui
 ┃ ┃ ┃ ┣ 📜avatar.tsx
 ┃ ┃ ┃ ┣ 📜badge.tsx
 ┃ ┃ ┃ ┣ 📜breadcrumb.tsx
 ┃ ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┃ ┣ 📜calendar.tsx
 ┃ ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┃ ┣ 📜chart.tsx
 ┃ ┃ ┃ ┣ 📜collapsible.tsx
 ┃ ┃ ┃ ┣ 📜dialog.tsx
 ┃ ┃ ┃ ┣ 📜dropdown-menu.tsx
 ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┃ ┣ 📜popover.tsx
 ┃ ┃ ┃ ┣ 📜progress.tsx
 ┃ ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┃ ┣ 📜separator.tsx
 ┃ ┃ ┃ ┣ 📜sheet.tsx
 ┃ ┃ ┃ ┣ 📜sidebar.tsx
 ┃ ┃ ┃ ┣ 📜skeleton.tsx
 ┃ ┃ ┃ ┣ 📜table.tsx
 ┃ ┃ ┃ ┣ 📜tabs.tsx
 ┃ ┃ ┃ ┣ 📜textarea.tsx
 ┃ ┃ ┃ ┗ 📜tooltip.tsx
 ┃ ┃ ┣ 📜CommentSection.tsx
 ┃ ┃ ┣ 📜EditProjectForm.tsx
 ┃ ┃ ┣ 📜EditTask.tsx
 ┃ ┃ ┣ 📜Layout.tsx
 ┃ ┃ ┣ 📜ProjectForm.tsx
 ┃ ┃ ┣ 📜ProjectInfo.tsx
 ┃ ┃ ┣ 📜TaskEditForm.tsx
 ┃ ┃ ┣ 📜TaskForm.tsx
 ┃ ┃ ┣ 📜TaskList.tsx
 ┃ ┃ ┗ 📜Tasks.tsx
 ┃ ┣ 📂graphql
 ┃ ┃ ┣ 📜mutations.ts
 ┃ ┃ ┣ 📜queries.ts
 ┃ ┃ ┗ 📜subscriptions.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜use-mobile.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜types.ts
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Dashboard.tsx
 ┃ ┃ ┣ 📜Performance.tsx
 ┃ ┃ ┗ 📜Tasks.tsx
 ┃ ┣ 📜apollo.ts
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.env
 ┣ 📜components.json
 ┣ 📜Dockerfile
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┗ 📜vite.config.ts
```


---

## ⚙️ Setup & Installation

### Prerequisites
- Docker & Docker Compose
- Node.js >= 20 (if running frontend locally)
- Python >= 3.11 (if running backend locally)

---

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/Dhruvagwal/VoiceAIWrapperScreening.git
cd VoiceAIWrapperScreening
```

### **2️⃣ Environment Variables**

Create `.env` in the backend directory:
```
DATABASE_URL=postgres://postgres:my-password@db:5432/VoiceAIWrapperDB
SECRET_KEY=your-secret-key
DEBUG=True
```

Frontend `.env` (optional):
```
VITE_API_URL=http://localhost:8000/graphql/
VITE_ORG_SLUG=demo-org
```

### **3️⃣ Run with Docker Compose**
```bash
docker-compose up --build
```

Backend → http://localhost:8000/graphql  
Frontend → http://localhost:5173

### **4️⃣ Run Locally Without Docker**

**Backend**
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

### **5️⃣ Production Build (Frontend + Nginx)**
```bash
cd frontend
npm install
npm run build
# Serve using Nginx
nginx -c /path/to/nginx.conf
```

Example Nginx config:
```
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri /index.html;
    }
}
```

---

## 📡 GraphQL API

**Base URL**
```
http://localhost:8000/graphql
```

**Required Header**
```
X-Org-Slug: your-org-slug
```

**Example Query: List Projects**
```graphql
query {
  projects {
    id
    name
    status
    taskCount
    completedTasks
  }
}
```

**Example Mutation: Create Project**
```graphql
mutation {
  createProject(data: {
    name: "Website Redesign"
    description: "Update the company website"
    status: "ACTIVE"
    dueDate: "2025-12-31"
  }) {
    ok
    project {
      id
      name
    }
  }
}
```

**Example Mutation: Create Task**
```graphql
mutation {
  createTask(data: {
    projectId: 1
    title: "Design new homepage"
    description: "Create modern layout"
    status: "TODO"
    assigneeEmail: "designer@example.com"
    dueDate: "2025-09-01T10:00:00Z"
  }) {
    ok
    task {
      id
      title
    }
  }
}
```

**Example Mutation: Add Task Comment**
```graphql
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
```

**Example Query: Project Statistics**
```graphql
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
```

---

## 📜 Full GraphQL Schema
```graphql
# --- Queries ---
type Query {
  projects(search: String): [ProjectType]
  project(id: ID!): ProjectType
  task(id: ID!): TaskType
  tasks(projectId: ID!): [TaskType]
  projectStatistics: ProjectStatisticsType
}

# --- Mutations ---
type Mutation {
  createProject(data: ProjectInput!): CreateProject
  updateProject(projectId: ID!, name: String, description: String, dueDate: Date, status: String): UpdateProject
  deleteProject(projectId: ID!): DeleteProject
  createTask(data: TaskInput!): CreateTask
  updateTask(taskId: ID!, title: String, description: String, status: String, assigneeEmail: String, dueDate: Date): UpdateTask
  deleteTask(taskId: ID!): DeleteTask
  addTaskComment(taskId: ID!, content: String!, authorEmail: String!): AddTaskComment
  deleteTaskComment(commentId: ID!): DeleteTaskComment
}

# --- Types ---
type ProjectType {
  id: ID!
  name: String
  description: String
  status: String
  dueDate: Date
  createdAt: DateTime
  tasks: [TaskType]
  taskCount: Int
  completedTasks: Int
}

type TaskType {
  id: ID!
  title: String
  description: String
  status: String
  assigneeEmail: String
  dueDate: DateTime
  createdAt: DateTime
  comments: [TaskCommentType]
}

type TaskCommentType {
  id: ID!
  content: String
  authorEmail: String
  timestamp: DateTime
}

type ProjectStatisticsType {
  totalProjects: Int!
  projectsByStatus: [ProjectStatusCountType!]!
  totalTasks: Int!
  tasksByStatus: [TaskStatusCountType!]!
  completionRate: Float!
}

type ProjectStatusCountType {
  status: String!
  count: Int!
}

type TaskStatusCountType {
  status: String!
  count: Int!
}

# --- Inputs ---
input ProjectInput {
  name: String!
  description: String
  status: String
  dueDate: Date
}

input TaskInput {
  projectId: ID!
  title: String!
  description: String
  status: String
  assigneeEmail: String
  dueDate: DateTime
}
```

---

## 🧪 Running Tests
**Backend**
```bash
python manage.py test
```

---

## 📦 Docker Compose
```yaml
version: '3.9'
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: VoiceAIWrapperDB
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: my-password 
    volumes:
      - dbdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DEBUG: "1"
      DATABASE_URL: postgres://pm:pm@db:5432/pm
      ALLOWED_HOSTS: "*"
      CORS_ALLOW_ORIGINS: http://localhost:5173
    ports:
      - "8000:8000"
    depends_on:
      - db

  frontend:
    build: ./frontend
    environment:
      VITE_API_URL: http://localhost:8000/graphql
      VITE_ORG_SLUG: demo-org
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  dbdata:
```

---


## 🔮 What's Included
- Working Django models with proper relationships
- Functional GraphQL API with organization isolation
- React components with TypeScript
- Apollo Client integration
- Form validation and error handling
- Basic test coverage
- Responsive UI design
- Proper database migrations
- Mock external integrations
- Docker containerization
- Performance optimizations
- Advanced UI features (drag-and-drop)
- Accessibility considerations
- Performance monitoring/logging 
- CI/CD setup

## 🔮 Future Improvements
- Real-time updates with GraphQL subscriptions
- Advanced filtering and sorting
- Comprehensive test coverage
- Role-based permissions
