import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import TaskListWithPerf from "./pages/Performance";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/:projectId" element={<Tasks />} />
          <Route path="/performance/:projectId" element={<TaskListWithPerf />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
