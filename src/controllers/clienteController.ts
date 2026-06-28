import { Response } from 'express';
import pool from '../database/connection';
import { AuthRequest } from '../middleware/authMiddleware';

export async function getPerfil(req: AuthRequest, res: Response) {
  try {
    const [rows]: any = await pool.execute(
      'SELECT id, nome, email, telefone, cep, rua, numero, bairro, cidade, estado, metodo_pagamento FROM clientes WHERE id = ?',
      [req.clienteId]
    );
    res.json(rows[0]);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
}

export async function updatePerfil(req: AuthRequest, res: Response) {
  const { nome, telefone, cep, rua, numero, bairro, cidade, estado, metodo_pagamento } = req.body;
  try {
    await pool.execute(
      `UPDATE clientes SET nome=?, telefone=?, cep=?, rua=?, numero=?, bairro=?, cidade=?, estado=?, metodo_pagamento=? WHERE id=?`,
      [nome, telefone, cep, rua, numero, bairro, cidade, estado, metodo_pagamento, req.clienteId]
    );
    res.json({ message: 'Perfil atualizado com sucesso!' });
  } catch {
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
}

export async function getFavoritos(req: AuthRequest, res: Response) {
  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM favoritos WHERE cliente_id = ?',
      [req.clienteId]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar favoritos' });
  }
}

export async function addFavorito(req: AuthRequest, res: Response) {
  const { produto_nome, produto_preco, produto_imagem } = req.body;
  try {
    await pool.execute(
      'INSERT INTO favoritos (cliente_id, produto_nome, produto_preco, produto_imagem) VALUES (?, ?, ?, ?)',
      [req.clienteId, produto_nome, produto_preco, produto_imagem]
    );
    res.status(201).json({ message: 'Produto favoritado!' });
  } catch {
    res.status(500).json({ message: 'Erro ao favoritar produto' });
  }
}

export async function removeFavorito(req: AuthRequest, res: Response) {
  const { id } = req.params;
  try {
    await pool.execute(
      'DELETE FROM favoritos WHERE id = ? AND cliente_id = ?',
      [id, req.clienteId]
    );
    res.json({ message: 'Favorito removido!' });
  } catch {
    res.status(500).json({ message: 'Erro ao remover favorito' });
  }
}