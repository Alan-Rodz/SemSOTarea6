import { Box, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Proceso } from '../../class/Proceso';
import { useSistemaOperativoContext } from '../../context/useSistemaOperativoContext';
import { generarUUID } from '../../util/generarUUID';
import { ComponenteProceso } from '../ComponenteProceso';

import { TituloSeccion } from './TituloSeccion';

// ********************************************************************************
export interface SeccionTerminadosProps { }

export const SeccionTerminados: React.FC<SeccionTerminadosProps> = ({ }) => {
    const { sistemaOperativo } = useSistemaOperativoContext();
    const [procesosMostrados, setProcesosMostrados] = useState<Proceso[]>([]);

    useEffect(() => {
        setProcesosMostrados(sistemaOperativo!.getProcesosTerminados());
    }, [sistemaOperativo]);

    return (
        <Box w="100%" h="100%" py={2} borderColor="gray.300">
            <Flex mt={50} flexDir={'column'}>
                <TituloSeccion nombreSeccion={`Terminados: ${procesosMostrados.length}`} />
                {procesosMostrados.map(proceso => <ComponenteProceso proceso={proceso} width={'100%'} key={generarUUID()}/>)}
            </Flex>
        </Box>
    )
}