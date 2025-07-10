import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-context";
import InstructorProvider from "./context/instructor-context";
import StudentProvider from "./context/student-context";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);
