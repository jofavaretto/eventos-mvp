import React from "react";
import { Link, useParams } from "react-router-dom";

export default function EventoDetalhe({ eventos }) {
  // ✅ Exercício Nível 3: rota dinâmica /evento/:id
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

  // ✅ Parte IV: status e vagas
  const lotado = evento.vagasRestantes === 0;

  return (
    <section className="stack">
      <Link className="btn ghost" to="/evento">Voltar</Link>

      <h2>{evento.titulo}</h2>

      <div className="row">
        <span className={lotado ? "badge lotado" : "badge aberto"}>
          {lotado ? "LOTADO" : "ABERTO"}
        </span>

        <span className="muted">
          Vagas: <strong>{evento.vagasRestantes}</strong> / {evento.capacidadeTotal}
        </span>
      </div>

      <p className="muted">{evento.data} • {evento.local}</p>

      {evento.descricao && <div className="box">{evento.descricao}</div>}

      {/* ✅ Parte IV: galeria de fotos */}
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

      {/* ✅ Parte IV: mapa (iframe embed) */}
      <h3>Localização</h3>
      {evento.mapaUrl ? (
        <div className="mapWrap">
          <iframe
            title="Mapa do evento"
            src={evento.mapaUrl}
            loading="lazy"
            className="mapFrame"
          />
        </div>
      ) : (
        <p className="muted">Sem mapa cadastrado.</p>
      )}

      {/* ✅ Parte IV: link para checkout */}
      <Link className="btn" to={`/evento/${evento.id}/checkout`}>
        Comprar ingresso
      </Link>
    </section>
  );
}
