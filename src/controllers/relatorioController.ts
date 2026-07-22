import { Request, Response } from 'express';
import pool from '../database/connection';

export async function getRelatorio(req: Request, res: Response) {
  try {
    // Total geral de vendas
    const [totalVendas]: any = await pool.execute(`
      SELECT 
        COUNT(*) as total_pedidos,
        SUM(total) as total_vendido
      FROM pedidos
    `);

    // Produtos mais vendidos
    const [maisVendidos]: any = await pool.execute(`
      SELECT 
        produto_nome,
        SUM(quantidade) as total_vendido,
        SUM(preco * quantidade) as total_faturado
      FROM itens_pedido
      GROUP BY produto_nome
      ORDER BY total_vendido DESC
      LIMIT 10
    `);

    // Vendas por dia (últimos 7 dias)
    const [vendasPorDia]: any = await pool.execute(`
      SELECT 
        DATE(created_at) as data,
        COUNT(*) as total_pedidos,
        SUM(total) as total_vendido
      FROM pedidos
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY data ASC
    `);

    res.json({
      totalVendas: totalVendas[0],
      maisVendidos,
      vendasPorDia,
    });
  } catch {
    res.status(500).json({ message: 'Erro ao gerar relatório' });
  }
}