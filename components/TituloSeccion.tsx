import { Box } from '@chakra-ui/react';

import { GLOBAL_BORDER_RADIUS, GLOBAL_SECONDARY_COLOR } from '../pages/index';

// ********************************************************************************
export interface TituloSeccionProps {
  nombreSeccion: string;
}

export const TituloSeccion: React.FC<TituloSeccionProps> = ({ nombreSeccion }) => {
  return (
    <>
      <Box
        transform='translateX(-50%)'
        top='0'
        left='50%'
        position={'absolute'}
        bg={GLOBAL_SECONDARY_COLOR}
        borderRadius={GLOBAL_BORDER_RADIUS}
        mt={5}
        padding={10}
        fontSize={15}
      >
        {nombreSeccion}
      </Box>
    </>
  )
}