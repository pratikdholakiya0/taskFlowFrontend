import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import TaskViewPage from "./pages/TaskViewPage.jsx";
import Admin from "./pages/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting.jsx";
import TaskAssignPage from "./pages/TaskAssignPage.jsx";
import AdminTask from "./pages/AdminTask.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/tasks" element={<TaskViewPage/>}/>
              <Route path="/addTask" element={<TaskAssignPage/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/listTask" element={<AdminTask/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/setting" element={<Setting/>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
