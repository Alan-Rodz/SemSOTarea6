import { Box, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Proceso } from '../class/Proceso';
import { useSistemaOperativoContext } from '../context/useSistemaOperativoContext';

import { ComponenteProceso } from './ComponenteProceso';
import { TituloSeccion } from './TituloSeccion';

// ********************************************************************************
export interface SeccionListoProps { }

export const SeccionListos: React.FC<SeccionListoProps> = ({ }) => {
    const { sistemaOperativo } = useSistemaOperativoContext();
    const [procesosMostrados, setProcesosMostrados] = useState<Proceso[]>([]);

    useEffect(() => {
        setProcesosMostrados(sistemaOperativo!.getProcesosListos());
    }, [sistemaOperativo]);


    return (
        <Box w="100%" h="100%" py={2} borderColor="gray.300">
            <Flex mt={50} flexDir={'column'}>
                <TituloSeccion nombreSeccion={`Listos: ${procesosMostrados.length}`} />
                { procesosMostrados.map(proceso => <ComponenteProceso proceso={proceso} width={'100%'} />) }
            </Flex>
        </Box>
    )
}