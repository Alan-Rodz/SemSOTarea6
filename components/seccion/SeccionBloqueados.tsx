import { Box, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Proceso } from '../../class/Proceso';
import { useSistemaOperativoContext } from '../../context/useSistemaOperativoContext';
import { generarUUID } from '../../util/generarUUID';
import { ComponenteProceso } from '../ComponenteProceso';

import { TituloSeccion } from './TituloSeccion';

// ********************************************************************************
export interface SeccionBloqueadosProps { }

export const SeccionBloqueados: React.FC<SeccionBloqueadosProps> = ({ }) => {
    const { sistemaOperativo } = useSistemaOperativoContext();
    const [procesosMostrados, setProcesosMostrados] = useState<Proceso[]>([]);

    useEffect(() => {
        setProcesosMostrados(sistemaOperativo!.getProcesosBloqueados());
    }, [sistemaOperativo]);


    return (
        <Box w="100%" h="100%" py={2} borderColor="gray.300">
            <Flex mt={50} flexDir={'column'}>
                <TituloSeccion nombreSeccion={`Bloqueados: ${procesosMostrados.length}`} />
                {procesosMostrados.map(proceso => <ComponenteProceso proceso={proceso} width={'100%'} key={generarUUID()}/>)}
            </Flex>
        </Box>
    )
}