import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Layout from "./components/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import EventCalendarView from "./pages/Views/EventCalendarView.jsx";
import Home from "./pages/Home.jsx";
import CalendarCreator from "./pages/CalendarCreator.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/createCalendar",
                element: <CalendarCreator />,
            },
            {
                path: "/calendar",
                element: <EventCalendarView />,
            },

        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);