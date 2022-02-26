import { Box, Button, Center, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useSistemaOperativoContext } from '../context/useSistemaOperativoContext';

import { GLOBAL_BORDER_RADIUS } from '../pages/index';
import { Boton } from './Boton';

// ********************************************************************************
export interface ControlesProps { }

export const Controles: React.FC<ControlesProps> = ({ }) => {
  const { sistemaOperativo } = useSistemaOperativoContext();

  const [inputValue, setInputValue] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isEvaluado, setIsEvaluado] = useState(false);

  // --- Handlers ----------------------------------------------------------------------------------------------------
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => { setInputValue((e.target as HTMLInputElement).value); }

  const handleEvaluar = () => {
    if (parseInt(inputValue) && parseInt(inputValue) > 0) {
      setIsEvaluado(!isEvaluado);
      setMensaje('Cantidad De Procesos Válida');
      sistemaOperativo?.setCantidadProcesos(parseInt(inputValue));
      sistemaOperativo?.inicializar();
    } else {
      setMensaje('Cantidad De Procesos Inválida');
    }
  }

  return (
    <Box w="100%" h="100%" py={2} borderColor="gray.300">
      <Center>
        <Input
          m={10}
          mt={50}
          placeholder={'Cantidad de procesos...'}
          value={inputValue}
          onChange={handleChange}
          borderRadius={GLOBAL_BORDER_RADIUS}
          padding={5}
        />
      </Center>

      {
        !isEvaluado
          ?
          <Center>
            <Boton contenido={'Evaluar Cantidad'} width={'50%'} callback={handleEvaluar} />
          </Center>
          : null
      }

      {
        isEvaluado &&
        <Flex mt={10}>
          <Boton contenido={'Comenzar'} width={'100%'} callback={handleEvaluar} />
          <Boton contenido={'Pausa'} width={'100%'} callback={() => { }} />
          <Boton contenido={'Interrupción'} width={'100%'} callback={() => { }} />
          <Boton contenido={'Marcar Error'} width={'100%'} callback={() => { }} />
          <Boton contenido={'Continuar'} width={'100%'} callback={() => { }} />
          <Boton contenido={'Terminar'} width={'100%'} callback={() => { }} />
        </Flex>
      }
      <Center mt={5}>
        <Box>{mensaje}</Box>
      </Center>
    </Box>
  )
}