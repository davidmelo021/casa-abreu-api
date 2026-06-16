import { Response } from 'express';
import pool from '../database/connection';
import { AuthRequest } from '../middleware/authMiddleware';

export async function criarPedido(req: AuthRequest, res: Response) {
  const { itens } = req.body;
  const clienteId = req.clienteId;

  try {
    const total = itens.reduce((acc: number, item: any) => acc + item.preco * item.quantidade, 0);
    const [result]: any = await pool.execute(
      'INSERT INTO pedidos (cliente_id, total) VALUES (?, ?)',
      [clienteId, total]
    );
    const pedidoId = result.insertId;

    for (const item of itens) {
      await pool.execute(
        'INSERT INTO itens_pedido (pedido_id, produto_nome, preco, quantidade) VALUES (?, ?, ?, ?)',
        [pedidoId, item.nome, item.preco, item.quantidade]
      );
    }

    res.status(201).json({ message: 'Pedido criado com sucesso!', pedidoId });
  } catch {
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
}

export async function listarPedidos(req: AuthRequest, res: Response) {
  try {
    const [pedidos]: any = await pool.execute(
      'SELECT * FROM pedidos WHERE cliente_id = ? ORDER BY created_at DESC',
      [req.clienteId]
    );
    res.json(pedidos);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
}