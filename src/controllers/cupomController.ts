import { Request, Response } from 'express';

const cupons: Record<string, number> = {
  'CASA10': 10,
  'OBRA20': 20,
  'ABREU15': 15,
};

export function validarCupom(req: Request, res: Response): void {
  const { codigo } = req.body;

  const desconto = cupons[codigo?.toUpperCase()];

  if (!desconto) {
    res.status(404).json({ message: 'Cupom inválido ou expirado!' });
    return;
  }

  res.json({
    codigo: codigo.toUpperCase(),
    desconto,
    message: `Cupom aplicado! ${desconto}% de desconto.`
  });
}