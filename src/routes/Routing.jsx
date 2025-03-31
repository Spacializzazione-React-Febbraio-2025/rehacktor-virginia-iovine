import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import ErrorPage from '../pages/error';
import GenrePage from "../pages/genrepage";

export function Routing() {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/games/:genre" element={<GenrePage />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
}