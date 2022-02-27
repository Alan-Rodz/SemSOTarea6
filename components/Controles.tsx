import { Box, Center, Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSistemaOperativoContext } from '../context/useSistemaOperativoContext';

import { GLOBAL_BORDER_RADIUS, GLOBAL_SECONDARY_COLOR } from '../pages/index';
import { Boton } from './Boton';

// ********************************************************************************
const VELOCIDAD = 500;
const MENSAJE_PROGRAMA_TERMINADO = 'Programa Terminado';
export interface ControlesProps { }

export const Controles: React.FC<ControlesProps> = ({ }) => {
  // --- Estados ----------------------------------------------------------------------------------------------------
  const { sistemaOperativo, setSistemaOperativo } = useSistemaOperativoContext();

  const [inputValue, setInputValue] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [isEvaluado, setIsEvaluado] = useState(false);
  const [isComenzado, setIsComenzado] = useState(false);
  const [isPausa, setIsPausa] = useState(false);
  const [isInterrupcion, setIsInterrupcion] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isTerminar, setIsTerminar] = useState(false);

  /// --- Effects ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (sistemaOperativo) {
      if (sistemaOperativo.getProcesosTerminados().length === parseInt(inputValue)) {
        setIsTerminar(!isTerminar);
        setMensaje(MENSAJE_PROGRAMA_TERMINADO);
      }
    }
  }, [sistemaOperativo])

  useEffect(() => {
    const modificarEstadoSO = setInterval(() => {
      if (isComenzado === false || isTerminar === true) { return; }

      const nuevoSO = sistemaOperativo!.procesarAccion(isComenzado, isPausa, isInterrupcion, isError, isTerminar);
      setSistemaOperativo(nuevoSO);
      setIsError(false);
      setIsInterrupcion(false);

    }, VELOCIDAD);
    return () => clearInterval(modificarEstadoSO);
  });

  // --- Handlers ----------------------------------------------------------------------------------------------------
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => { setInputValue((e.target as HTMLInputElement).value); }

  const handleEvaluar = () => {
    if (parseInt(inputValue) && parseInt(inputValue) > 0) {
      setIsEvaluado(!isEvaluado);
      setMensaje('Cantidad De Procesos Válida');

      setSistemaOperativo(sistemaOperativo!.setCantidadProcesos(parseInt(inputValue)));
      setSistemaOperativo(sistemaOperativo!.inicializar());
    } else {
      setMensaje('Cantidad De Procesos Inválida');
    }
  }

  const handleInterrupcion = () => {
    setIsInterrupcion(!isInterrupcion);
  }

  const handleError = () => {
    setIsError(!isError);
  }
  return (
    <Box w="100%" h="100%" py={2} borderColor="gray.300">
      <Center>
        <Box
          borderRadius={GLOBAL_BORDER_RADIUS}
          padding={10}
          bg={GLOBAL_SECONDARY_COLOR}
          mt={45}
          fontSize={15}
        >
          {`Reloj: ${sistemaOperativo?.getReloj()}`}
        </Box>
        {!isEvaluado &&
          <Input
            m={10}
            mt={50}
            placeholder={'Cantidad de procesos...'}
            value={inputValue}
            onChange={handleChange}
            borderRadius={GLOBAL_BORDER_RADIUS}
            padding={5}
          />
        }
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
        (isEvaluado && !isComenzado) &&
        <Flex mt={10}>
          <Boton contenido={'Comenzar'} width={'100%'} callback={() => setIsComenzado(!isComenzado)} />
        </Flex>
      }

      {(isComenzado && !isTerminar) &&
        <Flex mt={10}>
          <Boton contenido={`${isPausa ? 'Continuar' : 'Pausar'}`} width={'100%'} callback={() => setIsPausa(!isPausa)} />
          <Boton contenido={'Interrupción'} width={'100%'} callback={handleInterrupcion} />
          <Boton contenido={'Marcar Error'} width={'100%'} callback={handleError} />

          {
            !isTerminar &&
            <>
              <Boton contenido={'Terminar'} width={'100%'} callback={() => { setIsTerminar(!isTerminar); setMensaje(MENSAJE_PROGRAMA_TERMINADO); }} />
            </>
          }
        </Flex>
      }
      <Center mt={5}>
        <Box fontSize={15}>{mensaje}</Box>
      </Center>
    </Box>
  )
}