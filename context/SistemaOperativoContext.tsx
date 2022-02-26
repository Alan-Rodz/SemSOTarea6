import { createContext, Dispatch, SetStateAction } from 'react';
import { SistemaOperativo } from '../class/SistemaOperativo';

// ********************************************************************************
export type ContextoSistemaOperativo = { sistemaOperativo: SistemaOperativo | null }

export const SistemaOperativoContext = createContext<ContextoSistemaOperativo>({ sistemaOperativo: null /*default*/});

SistemaOperativoContext.displayName = 'SistemaOperativoContext';