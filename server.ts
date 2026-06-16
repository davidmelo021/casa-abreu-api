import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';
import pedidoRoutes from './src/routes/pedidoRoutes';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));