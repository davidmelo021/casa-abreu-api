import {request, response} from 'express';

const cupons:Record<string,number> = {
    'CASA10': 10,
    'OBRA20': 20,
    'ABREU15': 15,
};

export const validarCupom = (req:Request, res: Response) => {
    
}