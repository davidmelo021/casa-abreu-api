import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';
import pedidoRoutes from './src/routes/pedidoRoutes';
import clienteRoutes from './src/routes/clienteRoutes';
import relatoriosRouter from './src/routes/relatoriosRouter';
import CupomRoutes from './src/routes/cupomRoutes';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/relatorios', relatoriosRouter);
app.use('/cupom', CupomRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));