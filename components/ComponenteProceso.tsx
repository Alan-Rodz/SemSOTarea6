import { Box } from '@chakra-ui/react';
import { Proceso } from '../class/Proceso';

import { GLOBAL_BORDER_RADIUS, GLOBAL_SECONDARY_COLOR } from '../pages/index';

// ********************************************************************************
export interface ProcesoProps {
    proceso: Proceso;
    width: string;
}

export const ComponenteProceso: React.FC<ProcesoProps> = ({ width, proceso }) => {

    return (
        <>
            {
                proceso.estado === 'Nuevo' &&
                <Box
                    width={width}
                    borderRadius={GLOBAL_BORDER_RADIUS}
                    padding={10}
                    mt={10}
                    bg={GLOBAL_SECONDARY_COLOR}
                    fontSize={20}
                >
                    <Box>
                        { proceso.estado === 'Nuevo'
                            &&
                            `ID: ${proceso.ID} --- 
                            TME: ${proceso.tiempoRestante} --- 
                            TR: ${proceso.tiempoTotal} --- 
                            Operación: ${proceso.operacion} --- 
                            Operando1: ${proceso.operando1} --- 
                            Operando2: ${proceso.operando2} `
                        }
                    </Box>
                </Box>
            }
        </>
    )
}