import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Home from './Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import LessonPlan from "./LessonPlan";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/lesson-plan",
    element: <LessonPlan />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);