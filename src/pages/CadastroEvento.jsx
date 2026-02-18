import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroEvento({ onAdd }) {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState(""); // primeiro criar a variavel para adicionar o vetor do que o usuario vai digitar.

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao) { // após, fazer a validação dos campos de acordo com o preenchimento
      alert("Preencha todos os campos.");
      return;
    }

    onAdd({ titulo, data, local, descricao }); // após adicionar o onAdd para ele incluir no objeto e por na váriavel, se nao o dado morre sem isso, quando sai da página.
    navigate("/evento");
  }

  return ( // apos colocar aqui o campo para aparecer na tela de front-end
    <section className="stack">
      <h2>Cadastrar Evento</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Demo do sistema" />
        </label>

        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        <label>
          Local
          <input value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex: Laboratório" />
        </label>


        <label>
          Descrição
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: O Mundo Senai, é a amostra dos projetos feitos no curso." />
        </label>

        <div className="row">
          <button className="btn" type="submit">Salvar</button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
        </div>
      </form>


    </section>
  );
}