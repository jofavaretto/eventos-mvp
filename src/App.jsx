import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Evento from "./pages/Evento";
import CadastroEvento from "./pages/CadastroEvento";

export default function App() {
  const [eventos, setEventos] = useState([
    { id: 1, titulo: "Reunião do Projeto", data: "2026-02-12", local: "Sala 2" },
    { id: 2, titulo: "Review da Sprint", data: "2026-02-13", local: "Auditório" },
  ]);

  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <Menu />

      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home total={eventos.length} />} />
          <Route path="/evento" element={<Evento eventos={eventos} onRemover={removerEvento} />} />
          <Route path="/cadastrar" element={<CadastroEvento onAdd={adicionarEvento} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}