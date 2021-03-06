import { Box, Center, Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSistemaOperativoContext } from '../context/useSistemaOperativoContext';

import { GLOBAL_BORDER_RADIUS, GLOBAL_SECONDARY_COLOR } from '../pages/index';
import { Boton } from './Boton';

// ********************************************************************************
const VELOCIDAD = 1000;
const CONSTANTE_DURACION_MSGS = 5;
const MENSAJE_PROGRAMA_TERMINADO = 'Programa Terminado';
const teclasValidas = ['Enter', 'KeyC', 'KeyP', 'KeyI', 'KeyE', 'KeyT']
export interface ControlesProps { }

export const Controles: React.FC<ControlesProps> = ({ }) => {
  // --- Estados ----------------------------------------------------------------------------------------------------
  const { sistemaOperativo, setSistemaOperativo } = useSistemaOperativoContext();

  const [localCounter, setLocalCounter] = useState(0);
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
  }, [localCounter])

  useEffect(() => {
    const modificarEstadoSO = setInterval(() => {
      if (isComenzado === false || isTerminar === true) { return; }

      const nuevoSO = sistemaOperativo!.procesarAccion(isComenzado, isPausa, isInterrupcion, isError, isTerminar);
      setSistemaOperativo(nuevoSO);
      setIsError(false);
      setIsInterrupcion(false);
      
      setLocalCounter(localCounter => localCounter++);
      
      if (localCounter % CONSTANTE_DURACION_MSGS === 0) { setMensaje(''); }
    }, VELOCIDAD);
    return () => clearInterval(modificarEstadoSO);
  });

  // --- Global Key Handling ----------------------------------------------------------------------------------------------------
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (!teclasValidas.includes(e.code)) { return; }

      /*else*/
      if (e.code === 'KeyC') { e.preventDefault(); if(isComenzado === false) { setIsComenzado(!isComenzado); setMensaje('Comenzado'); } else { return; } }
      if (e.code === 'KeyP') { e.preventDefault(); if(isComenzado === true) { setIsPausa(!isPausa); isPausa ? setMensaje('Programa Continuando!') : setMensaje('Programa Pausado!') } else { return; } }
      if (e.code === 'KeyI') { e.preventDefault(); if(isComenzado === true) { handleInterrupcion(); setMensaje('Si hay un proceso en ejecuci??n y la memoria est?? llena, ser?? interrumpido.'); } else { return; } }
      if (e.code === 'KeyE') { e.preventDefault(); if(isComenzado === true) { handleError(); setMensaje('Si hay un proceso en ejecuci??n y la memoria est?? llena, ser?? marcado como error.'); } else { return; } }
      if (e.code === 'KeyT') { e.preventDefault(); if(isComenzado === true) { setIsTerminar(!isTerminar); setMensaje(MENSAJE_PROGRAMA_TERMINADO); } else { return; } }

    })
  }, [sistemaOperativo])

  // --- Handlers ----------------------------------------------------------------------------------------------------
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => { setInputValue((e.target as HTMLInputElement).value); }

  const handleEvaluar = () => {
    if (parseInt(inputValue) && parseInt(inputValue) > 0) {
      setIsEvaluado(!isEvaluado);
      setMensaje('Cantidad De Procesos V??lida');

      setSistemaOperativo(sistemaOperativo!.setCantidadProcesos(parseInt(inputValue)));
      setSistemaOperativo(sistemaOperativo!.inicializar());
    } else {
      setMensaje('Cantidad De Procesos Inv??lida');
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
            <Boton contenido={'Evaluar Cantidad (Dar Click Aqu??)'} width={'50%'} callback={handleEvaluar} />
          </Center>
          : null
      }

      {
        (isEvaluado && !isComenzado) &&
        <Flex mt={10}>
          <Boton contenido={'Comenzar (Tecla C)'} width={'100%'} callback={() => setIsComenzado(!isComenzado)} />
        </Flex>
      }

      {(isComenzado && !isTerminar) &&
        <Flex mt={10}>
          <Boton contenido={`${isPausa ? 'Continuar (Tecla P)' : 'Pausar (Tecla P)'}`} width={'100%'} callback={() => setIsPausa(!isPausa)} />
          <Boton contenido={'Interrupci??n (Tecla I)'} width={'100%'} callback={handleInterrupcion} />
          <Boton contenido={'Marcar Error (Tecla E)'} width={'100%'} callback={handleError} />

          {
            !isTerminar &&
            <>
              <Boton contenido={'Terminar (Tecla T)'} width={'100%'} callback={() => { setIsTerminar(!isTerminar); setMensaje(MENSAJE_PROGRAMA_TERMINADO); }} />
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