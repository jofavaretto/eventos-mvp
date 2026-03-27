import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * Tabela eventos (Postgres):
 * id, titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url, created_at
 */

// ✅ GET /eventos -> LISTAR
router.get("/", async (req, res) => {
  try {
    const r = await pool.query("SELECT * FROM eventos ORDER BY id DESC");
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar eventos", detalhe: err.message });
  }
});

// ✅ POST /eventos -> CRIAR (salva no banco)
router.post("/", async (req, res) => {
  try {
    console.log("POST /eventos BODY:", req.body);

    const { titulo, data, local, descricao, capacidade_total, mapa_url } = req.body;

    // valida obrigatórios
    if (!titulo || !data || !local || !descricao || capacidade_total == null) {
      return res.status(400).json({
        erro: "Campos obrigatórios: titulo, data, local, descricao, capacidade_total",
      });
    }

    if (Number(capacidade_total) <= 0) {
      return res.status(400).json({ erro: "capacidade_total deve ser > 0" });
    }

    // regra do projeto: começa com vagas_restantes = capacidade_total
    const vagas_restantes = Number(capacidade_total);

    const r = await pool.query(
      `INSERT INTO eventos
        (titulo, data, local, descricao, capacidade_total, vagas_restantes, mapa_url)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [titulo, data, local, descricao, Number(capacidade_total), vagas_restantes, mapa_url ?? null]
    );

    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar evento", detalhe: err.message, codigo: err.code });
  }
});

// ✅ PUT /eventos/:id -> ATUALIZAR (editar no banco)
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log("PUT /eventos/:id BODY:", req.body);

    const { titulo, data, local, descricao, capacidade_total, mapa_url } = req.body;

    if (!titulo || !data || !local || !descricao || capacidade_total == null) {
      return res.status(400).json({
        erro: "Campos obrigatórios: titulo, data, local, descricao, capacidade_total",
      });
    }

    if (Number(capacidade_total) <= 0) {
      return res.status(400).json({ erro: "capacidade_total deve ser > 0" });
    }

    const r = await pool.query(
      `UPDATE eventos
       SET titulo=$1, data=$2, local=$3, descricao=$4,
           capacidade_total=$5,
           mapa_url=$6
       WHERE id=$7
       RETURNING *`,
      [titulo, data, local, descricao, Number(capacidade_total), mapa_url ?? null, id]
    );

    if (r.rows.length === 0) return res.status(404).json({ erro: "Evento não encontrado" });

    res.json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar evento", detalhe: err.message, codigo: err.code });
  }
});

// ✅ DELETE /eventos/:id -> DELETAR
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const r = await pool.query("DELETE FROM eventos WHERE id=$1 RETURNING id", [id]);

    if (r.rows.length === 0) return res.status(404).json({ erro: "Evento não encontrado" });

    res.json({ ok: true, deletedId: r.rows[0].id });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar evento", detalhe: err.message, codigo: err.code });
  }
});

export default router;