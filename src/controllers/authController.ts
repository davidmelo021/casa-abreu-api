import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../database/connection';

export async function register(req: Request, res: Response) {
  const { nome, email, senha } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);
    await pool.execute(
      'INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hash]
    );
    res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    res.status(500).json({ message: 'Erro ao cadastrar' });
  }
}

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;
  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM clientes WHERE email = ?', [email]
    );
    if (rows.length === 0) return res.status(401).json({ message: 'Email ou senha incorretos' });

    const cliente = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, cliente.senha);
    if (!senhaCorreta) return res.status(401).json({ message: 'Email ou senha incorretos' });

    const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    res.json({ token, nome: cliente.nome });
  } catch {
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
}