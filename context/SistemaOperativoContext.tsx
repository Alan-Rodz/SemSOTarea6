import { createContext, Dispatch, SetStateAction } from 'react';
import { SistemaOperativo } from '../class/SistemaOperativo';

// ********************************************************************************
export type ContextoSistemaOperativo = { 
    sistemaOperativo: SistemaOperativo | null;
    setSistemaOperativo: Dispatch<SetStateAction<SistemaOperativo>>
}

export const SistemaOperativoContext = createContext<ContextoSistemaOperativo>({ sistemaOperativo: null /*default*/, setSistemaOperativo: ()=>{} });
SistemaOperativoContext.displayName = 'SistemaOperativoContext';
