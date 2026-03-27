import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="menu">
      {/* MENU (Usuário): Home e lista */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Home
      </NavLink>

      <NavLink
        to="/evento"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Eventos
      </NavLink>

      {/* MENU (Admin): cadastro/edição acontece na mesma tela /cadastrar */}
      <NavLink
        to="/cadastrar"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        Cadastrar (Admin)
      </NavLink>
    </nav>
  );
}
