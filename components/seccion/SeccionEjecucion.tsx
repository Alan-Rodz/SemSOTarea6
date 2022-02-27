import { Box, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Proceso } from '../../class/Proceso';
import { useSistemaOperativoContext } from '../../context/useSistemaOperativoContext';
import { ComponenteProceso } from '../ComponenteProceso';

import { TituloSeccion } from './TituloSeccion';

// ********************************************************************************
export interface SeccionEjecucionProps { }

export const SeccionEjecucion: React.FC<SeccionEjecucionProps> = ({ }) => {
    const { sistemaOperativo } = useSistemaOperativoContext();
    const [procesoMostrado, setProcesoMostrado] = useState<Proceso | null>(null);

    useEffect(() => {
        setProcesoMostrado(sistemaOperativo!.getProcesoEnEjecucion());
    }, [sistemaOperativo]);

    return (
        <Box w="100%" h="100%" py={2} borderColor="gray.300">
            <Flex mt={50} flexDir={'column'}>
                <TituloSeccion nombreSeccion={'En Ejecución'} />
                {procesoMostrado && 
                    <ComponenteProceso proceso={procesoMostrado} width={'100%'}/>
                }
            </Flex>
        </Box>
    )
}