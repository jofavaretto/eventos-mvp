import React from "react";
import { Link, useParams } from "react-router-dom";

export default function EventoDetalhe({ eventos }) {
  const { id } = useParams();

  const evento = eventos.find((e) => String(e.id) === String(id));

  if (!evento) {
    return (
      <section className="stack">
        <h2>Evento não encontrado</h2>
        <Link className="btn ghost" to="/evento">Voltar</Link>
      </section>
    );
  }

  // ✅ CORRIGIDO: compatível com snake_case do banco (vagas_restantes, capacidade_total, mapa_url)
  // e também com camelCase caso venha de outra fonte
  const vagasRestantes = evento.vagas_restantes ?? evento.vagasRestantes ?? 0;
  const capacidadeTotal = evento.capacidade_total ?? evento.capacidadeTotal ?? 0;
  const mapaUrl = evento.mapa_url ?? evento.mapaUrl ?? "";

  const lotado = vagasRestantes === 0;

  return (
    <section className="stack">
      <Link className="btn ghost" to="/evento">Voltar</Link>

      <h2>{evento.titulo}</h2>

      <div className="row">
        <span className={lotado ? "badge lotado" : "badge aberto"}>
          {lotado ? "LOTADO" : "ABERTO"}
        </span>

        <span className="muted">
          Vagas: <strong>{vagasRestantes}</strong> / {capacidadeTotal}
        </span>
      </div>

      <p className="muted">{evento.data} • {evento.local}</p>

      {evento.descricao && <div className="box">{evento.descricao}</div>}

      {/* Galeria de fotos */}
      <h3>Fotos</h3>
      {evento.fotos && evento.fotos.length > 0 ? (
        <div className="galeria">
          {evento.fotos.map((url, i) => (
            <img key={i} className="foto" src={url} alt={`Foto ${i + 1}`} />
          ))}
        </div>
      ) : (
        <p className="muted">Sem fotos cadastradas.</p>
      )}

      {/* Mapa embed */}
      <h3>Localização</h3>
      {mapaUrl ? (
        <div className="mapWrap">
          <iframe
            title="Mapa do evento"
            src={mapaUrl}
            loading="lazy"
            className="mapFrame"
          />
        </div>
      ) : (
        <p className="muted">Sem mapa cadastrado.</p>
      )}

      {/*  CORRIGIDO: passa vagasRestantes correto para o link de checkout */}
      <Link className="btn" to={`/evento/${evento.id}/checkout`}>
        Comprar ingresso
      </Link>
    </section>
  );
}