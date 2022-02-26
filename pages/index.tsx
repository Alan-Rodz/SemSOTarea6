import type { NextPage } from 'next'
import { Grid, GridItem } from '@chakra-ui/react';

import { TituloSeccion } from '../components/TituloSeccion';
import { Controles } from '../components/Controles';
import { ContenedorSeccion } from '../components/ContenedorSeccion';

// ********************************************************************************
export const GLOBAL_BORDER_RADIUS = 15;
export const GLOBAL_COLOR = '#D0F3DD';
export const GLOBAL_SECONDARY_COLOR = '#96e6b3';

// ********************************************************************************
const Home: NextPage = () => {
  return (
    <Grid h='100vh' templateRows='repeat(10, 1fr)' templateColumns='repeat(10, 1fr)' gap={1}>
      <GridItem
        overflowX={'scroll'}
        overflowY={'scroll'}
        gridAutoFlow={'column'}
        rowSpan={2}
        colSpan={5}
        bg={GLOBAL_COLOR}
        borderRadius={GLOBAL_BORDER_RADIUS}>
        <ContenedorSeccion>
          <TituloSeccion nombreSeccion='En Ejecución' />
        </ContenedorSeccion>
      </GridItem>

      <GridItem
        overflowX={'scroll'}
        overflowY={'scroll'}
        gridAutoFlow={'column'}
        rowStart={3}
        rowSpan={3}
        colSpan={5}
        bg={GLOBAL_COLOR}
        borderRadius={GLOBAL_BORDER_RADIUS}>
        <ContenedorSeccion>
          <TituloSeccion nombreSeccion='Bloqueados' />
        </ContenedorSeccion>
      </GridItem>

      <GridItem
        overflowX={'scroll'}
        overflowY={'scroll'}
        gridAutoFlow={'column'}
        rowStart={6}
        rowSpan={6}
        colSpan={5}
        bg={GLOBAL_COLOR}
        borderRadius={GLOBAL_BORDER_RADIUS}>
        <ContenedorSeccion>
          <TituloSeccion nombreSeccion='Nuevos' />
        </ContenedorSeccion>
      </GridItem>

      <GridItem
        overflowX={'scroll'}
        overflowY={'scroll'}
        gridAutoFlow={'column'}
        colStart={6}
        rowStart={1}
        rowSpan={2}
        colSpan={5}
        bg={GLOBAL_COLOR}
        borderRadius={GLOBAL_BORDER_RADIUS}>

        <ContenedorSeccion>
          <TituloSeccion nombreSeccion='Controles' />
          <Controles />
        </ContenedorSeccion>
      </GridItem>

      <GridItem
        overflowX={'scroll'}
        overflowY={'scroll'}
        gridAutoFlow={'column'}
        colStart={6}
        rowStart={3}
        rowSpan={3}
        colSpan={5}
        bg={GLOBAL_COLOR}
        borderRadius={GLOBAL_BORDER_RADIUS}>

        <ContenedorSeccion>
          <TituloSeccion nombreSeccion='Memoria (Procesos Listos)' />
        </ContenedorSeccion>
      </GridItem>

      <GridItem
        overflowX={'scroll'}
        overflowY={'scroll'}
        gridAutoFlow={'column'}
        rowStart={6}
        colStart={6}
        rowSpan={6}
        colSpan={5}
        bg={GLOBAL_COLOR}
        borderRadius={GLOBAL_BORDER_RADIUS}>

        <ContenedorSeccion>
          <TituloSeccion nombreSeccion='Terminados' />
        </ContenedorSeccion>
      </GridItem>

    </Grid>);
}

export default Home;