import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Agendamento from "./pages/agendamento";
import Agendamentos from "./pages/admin/agendamentos";
import Admin from "./pages/admin";
import Servicos from "./pages/admin/servicos";
import ServicosFeitos from "./pages/admin/servicosFeitos";
import ListarServicos from "./pages/admin/listarServicos";
import ListarServicosFeitos from "./pages/admin/listarServicosFeitos";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/agendamento" element={<Agendamento />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/agendamentos" element={<Agendamentos />} />
                <Route path="/admin/servicos" element={<Servicos />} />
                <Route path="/admin/servicosfeitos" element={<ServicosFeitos />} />
                <Route path="/admin/listarServicos" element={<ListarServicos />} />
                <Route path="/admin/listarServicosFeitos" element={<ListarServicosFeitos />} />
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);
