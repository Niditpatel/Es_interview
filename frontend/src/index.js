import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Fallback from "./components/FallBack";
const Login = lazy(() => import("./Pages/Login"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const BlogSave = lazy(() => import("./Pages/BlogSave"));
const BlogList = lazy(() => import("./Pages/BlogList"));

const root = ReactDOM.createRoot(document.getElementById("root"));

const RouteGuard = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route
            path="/"
            element={
              <React.Suspense fallback={Fallback}>
                <Login />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <React.Suspense fallback={Fallback}>
                <SignUp />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/blog-save"
            element={
              <RouteGuard>
                <React.Suspense fallback={Fallback}>
                  <BlogSave />
                </React.Suspense>
              </RouteGuard>
            }
          ></Route>
          <Route
            path="/blog-list"
            element={
              <RouteGuard>
                <React.Suspense fallback={Fallback}>
                  <BlogSave />
                </React.Suspense>
              </RouteGuard>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
