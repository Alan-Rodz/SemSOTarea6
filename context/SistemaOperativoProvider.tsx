import { useEffect, useState } from 'react';
import { SistemaOperativo } from '../class/SistemaOperativo';
import { SistemaOperativoContext } from './SistemaOperativoContext';

// ********************************************************************************
export const SistemaOperativoProvider: React.FC = ({ children }) => {
  const [ sistemaOperativo ] = useState( new SistemaOperativo(0, null, [], [], [], 0, []));
  return (<SistemaOperativoContext.Provider value={{ sistemaOperativo }}>{children}</SistemaOperativoContext.Provider>);
};