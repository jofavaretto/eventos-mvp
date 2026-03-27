import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventosRouter from "./routes/eventos_routes.js"; //  importa o router correto

dotenv.config();

const app = express();

// permite que o front-end acesse a API
app.use(cors());

// permite receber JSON no body das requisições
app.use(express.json());

// rota de teste
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API rodando!" });
});

// ✅ usa o router de eventos (GET, POST, PUT, DELETE todos incluídos)
app.use("/eventos", eventosRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});