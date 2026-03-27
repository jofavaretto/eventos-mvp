import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroEvento({
  onAdd,
  eventoEditando,
  onAtualizar,
  onCancelarEdicao,
}) {
  const navigate = useNavigate();

  // ✅ (JÁ EXISTIA / BASE) States dos campos básicos do formulário
  // Papel no React: STATE = dados que mudam conforme o usuário digita
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");

  // ✅ (ADICIONADO) Novos campos para enriquecer o evento
  // - capacidadeTotal: para controlar lotação/vagas
  // - mapaUrl: para embed do Google Maps (iframe na tela do evento)
  // - fotosTexto: textarea com 1 URL por linha, depois vira array
  const [capacidadeTotal, setCapacidadeTotal] = useState(0);
  const [mapaUrl, setMapaUrl] = useState("");
  const [fotosTexto, setFotosTexto] = useState("");

  // ✅ (ADICIONADO) useEffect para modo "editar"
  // Quando o usuário clica em "Editar" em algum evento,
  // o form precisa vir preenchido com os dados daquele evento.
  useEffect(() => {
    if (eventoEditando) {
      // Preenche campos básicos
      setTitulo(eventoEditando.titulo || "");
      setData(eventoEditando.data || "");
      setLocal(eventoEditando.local || "");
      setDescricao(eventoEditando.descricao || "");

      // Preenche novos campos
      setCapacidadeTotal(Number(eventoEditando.capacidadeTotal || 0));
      setMapaUrl(eventoEditando.mapaUrl || "");

      // ✅ (ADICIONADO) Se fotos for array, converte para texto (1 por linha)
      // Isso facilita o aluno editar no textarea.
      setFotosTexto((eventoEditando.fotos || []).join("\n"));
    }
  }, [eventoEditando]);

  // ✅ (ADICIONADO) Função utilitária para "resetar" o formulário
  // Papel no React: Handler/função auxiliar para limpar states
  function limpar() {
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setCapacidadeTotal(0);
    setMapaUrl("");
    setFotosTexto("");
  }

  // ✅ (ADICIONADO) Cancelar: limpa, sai do modo edição (se houver) e navega
  function cancelar() {
    limpar();

    // Se estava editando, avisa o componente pai para "sair do modo edição"
    if (eventoEditando) onCancelarEdicao();

    // Volta para a tela de eventos
    navigate("/evento");
  }

  // ✅ (ADICIONADO/MELHORADO) Submit central do formulário
  // Papel: handler de envio (onSubmit)
  function handleSubmit(e) {
    e.preventDefault();

    // ✅ (ADICIONADO) Validação mínima dos campos obrigatórios
    if (!titulo || !data || !local || !descricao) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // ✅ (ADICIONADO) Validação da capacidade
    const cap = Number(capacidadeTotal);
    if (!cap || cap <= 0) {
      alert("Capacidade total precisa ser maior que 0.");
      return;
    }

    // ✅ (ADICIONADO) Converte o textarea em array de URLs
    // Regra: 1 URL por linha, remove espaços e linhas vazias
    const fotos = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter(Boolean);

    // ✅ (ADICIONADO) Dois fluxos: editar OU criar
    if (eventoEditando) {
      // ✅ MODO EDITAR
      // Atualiza o evento existente mantendo id e outros dados
      const atualizado = {
        ...eventoEditando,
        titulo,
        data,
        local,
        descricao,
        capacidadeTotal: cap,

        // ✅ (ADICIONADO) Regra de negócio:
        // garante que vagasRestantes não fique maior que capacidadeTotal
        vagasRestantes: Math.min(eventoEditando.vagasRestantes ?? cap, cap),

        mapaUrl,
        fotos,
      };

      // Chama função do componente pai para atualizar a lista
      onAtualizar(atualizado);

      // Sai do modo edição no pai
      onCancelarEdicao();
    } else {
      // ✅ MODO CRIAR
      // Cria um novo evento com vagasRestantes iniciando igual à capacidade
      onAdd({
        titulo,
        data,
        local,
        descricao,
        capacidadeTotal: cap,

        // ✅ (ADICIONADO) Regra de negócio:
        // ao criar, vagasRestantes começa igual à capacidade total
        vagasRestantes: cap,

        mapaUrl,
        fotos,
      });
    }

    // ✅ (ADICIONADO) Pós-salvar: limpa e volta para a tela de eventos
    limpar();
    navigate("/evento");
  }

  return (
    <section className="stack">
      {/* ✅ (ADICIONADO) título muda dependendo se está editando ou criando */}
      <h2>{eventoEditando ? "Admin: Editar Evento" : "Admin: Cadastrar Evento"}</h2>

      {/* ✅ Handler do formulário ligado ao handleSubmit */}
      <form className="form stack" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)} // STATE atualiza ao digitar
          />
        </label>

        <label>
          Data
          <input
            className="input"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>

        <label>
          Local
          <input
            className="input"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </label>

        <label>
          Descrição
          <input
            className="input"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </label>

        {/* ✅ (ADICIONADO) Campo de capacidade */}
        <label>
          Capacidade total
          <input
            className="input"
            type="number"
            min={1}
            value={capacidadeTotal}
            onChange={(e) => setCapacidadeTotal(e.target.value)}
            placeholder="Ex: 50"
          />
        </label>

        {/* ✅ (ADICIONADO) Campo do mapa */}
        <label>
          Link do mapa (Google Maps embed)
          <input
            className="input"
            value={mapaUrl}
            onChange={(e) => setMapaUrl(e.target.value)}
            placeholder="Cole um link com output=embed"
          />
        </label>

        {/* ✅ (ADICIONADO) Campo de fotos (1 URL por linha) */}
        <label>
          Fotos (1 URL por linha)
          <textarea
            className="input"
            rows={4}
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            placeholder={"https://...\nhttps://...\nhttps://..."}
          />
        </label>

        <div className="row">
          {/* ✅ (ADICIONADO) texto do botão muda no modo edição */}
          <button className="btn" type="submit">
            {eventoEditando ? "Salvar alterações" : "Salvar"}
          </button>

          {/* ✅ (ADICIONADO) botões auxiliares */}
          <button className="btn ghost" type="button" onClick={limpar}>
            Limpar Formulário
          </button>

          <button className="btn ghost" type="button" onClick={cancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}