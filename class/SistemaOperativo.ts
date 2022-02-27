import { Estado, Operacion, operacionesValidas, Proceso } from './Proceso';
import { generarNumeroAleatorio } from '../util/generarNumeroAleatorio'

// ********************************************************************************
export const CONSTANTE_TIEMPO_BLOQUEADO = 8;
export const CONSTANTE_MEMORIA = 5;

export type EstadoSO = 'Activo' | 'Terminado';
export class SistemaOperativo {
    private cantidadProcesos: number;
    private procesoEnEjecucion: Proceso | null;
    private procesosBloqueados: Proceso[];
    private procesosNuevos: Proceso[];
    private procesosTerminados: Proceso[];
    private reloj: number;
    private procesosListos: Proceso[];
    private estadoSO: EstadoSO;

    constructor(cantidadProcesos: number, procesoEnEjecucion: Proceso | null, procesosBloqueados: Proceso[], procesosNuevos: Proceso[], procesosTerminados: Proceso[], reloj: number, procesosListos: Proceso[], estadoSO: EstadoSO) {
        this.cantidadProcesos = cantidadProcesos;
        this.procesoEnEjecucion = procesoEnEjecucion;
        this.procesosBloqueados = procesosBloqueados;
        this.procesosNuevos = procesosNuevos;
        this.procesosTerminados = procesosTerminados;
        this.reloj = reloj;
        this.procesosListos = procesosListos;
        this.estadoSO = estadoSO;
    }

    // --- Estado ----------------------------------------------------------------------------------------------------
    public inicializar = () => {
        for (let i = 0; i < this.cantidadProcesos; i++) {
            const idGenerado = i + 1;
            const tmeGenerado = Math.floor(Math.random() * (16 - 6) + 6);
            const trGenerado = tmeGenerado;
            const ttGenerado = 0;

            const opGenerada: Operacion = operacionesValidas[Math.floor(Math.random() * operacionesValidas.length)];
            let op1Generado = 0;
            let op2Generado = 0;
            if (opGenerada === '+') {
                op1Generado = generarNumeroAleatorio();
                op2Generado = generarNumeroAleatorio();
            }
            else if (opGenerada === '-') {
                op1Generado = generarNumeroAleatorio();
                op2Generado = generarNumeroAleatorio();
            }
            else if (opGenerada === '*') {
                op1Generado = generarNumeroAleatorio();
                op2Generado = generarNumeroAleatorio();
            }
            else if (opGenerada === '/') {
                let bandera = true;
                while (bandera === true) {
                    op1Generado = generarNumeroAleatorio();
                    op2Generado = generarNumeroAleatorio();
                    (op1Generado === 0 || op2Generado == 0) ? bandera = true : bandera = false;
                }
            }
            else if (opGenerada === '%') {
                let bandera = true;
                while (bandera === true) {
                    op1Generado = generarNumeroAleatorio();
                    op2Generado = generarNumeroAleatorio();
                    (op1Generado === 0 || op2Generado == 0) ? bandera = true : bandera = false;
                }
            }

            let resultadoGenerado = 0;
            if (opGenerada === '+') { resultadoGenerado = Math.ceil(op1Generado + op2Generado); }
            else if (opGenerada === '-') { resultadoGenerado = Math.ceil(op1Generado - op2Generado); }
            else if (opGenerada === '*') { resultadoGenerado = Math.ceil(op1Generado * op2Generado); }
            else if (opGenerada === '/') { resultadoGenerado = Math.ceil(op1Generado / op2Generado); }
            else if (opGenerada === '%') { resultadoGenerado = Math.ceil(op1Generado % op2Generado); }

            const estadoGenerado: Estado = 'Nuevo';
            const errorGenerado = false;

            const nuevoProceso = new Proceso(idGenerado, tmeGenerado, trGenerado, ttGenerado, opGenerada, op1Generado, op2Generado, resultadoGenerado, estadoGenerado, errorGenerado);
            this.procesosNuevos.push(nuevoProceso);
        }
        const nuevoEstado = { ...this };
        return nuevoEstado;
    }

    public procesarAccion = (isComenzado: boolean, isPausa: boolean, isInterrupcion: boolean, isError: boolean, isTerminar: boolean) => {
        // --- Estados Modificadores ----------------------------------------------------------------------------------------------------
        if (isTerminar) {
            if (this.estadoSO === 'Terminado') {
                const nuevoEstado = { ...this };
                return nuevoEstado;
            }

            if (this.procesoEnEjecucion) {
                this.procesoEnEjecucion.estado = 'Terminado';
                this.procesoEnEjecucion.tiempoFinalizacion = this.reloj; /*establecer tiempo finalizacion*/
                this.procesosTerminados.push(this.procesoEnEjecucion);
            }

            this.procesosBloqueados.forEach(proceso => { proceso.tiempoFinalizacion = this.reloj; proceso.estado = 'Terminado' }); /*establecer tiempo finalizacion*/
            this.procesosNuevos.forEach(proceso => { proceso.tiempoFinalizacion = this.reloj; proceso.estado = 'Terminado' });     /*establecer tiempo finalizacion*/
            this.procesosListos.forEach(proceso => { proceso.tiempoFinalizacion = this.reloj; proceso.estado = 'Terminado' });     /*establecer tiempo finalizacion*/

            this.procesosTerminados = [...this.procesosBloqueados, ...this.procesosNuevos, ...this.procesosListos];

            this.procesoEnEjecucion = null;
            this.procesosBloqueados = [];
            this.procesosNuevos = [];
            this.procesosListos = [];

            this.estadoSO = 'Terminado';

            const nuevoEstado = { ...this };
            return nuevoEstado;
        }

        if (isPausa) { const nuevoEstado = { ...this }; return nuevoEstado; }

        let banderaRegresar = false;
        banderaRegresar = this.checarMemoriaLlena();
        if (banderaRegresar) { this.incrementarTiemposGenerales(); const nuevoEstado = { ...this }; return nuevoEstado; }

        // --- Procesamiento Normal ----------------------------------------------------------------------------------------------------
        if (this.procesoEnEjecucion === null && this.procesosListos.length) { /*no hay proceso en ejecución*/
            let proceso = this.procesosListos.shift();
            if (proceso) {
                proceso.estado = 'Ejecucion';
                if (proceso.tiempoRespuesta === 0) { proceso.tiempoRespuesta = this.reloj; } /*establecer tiempo respuesta la primera vez*/
                this.procesoEnEjecucion = proceso;
            }
        }

        if (this.procesoEnEjecucion && !isInterrupcion && !isError) { /*hay un proceso en ejecución y no hay señales extra*/
            if (this.procesoEnEjecucion.tiempoTotal !== this.procesoEnEjecucion.tiempoMaximoEstimado) {
                this.procesoEnEjecucion.tiempoServicio++; /*establecer tiempo servicio*/
                this.procesoEnEjecucion.tiempoTotal++;
                this.procesoEnEjecucion.tiempoRestante--;
            } else {
                this.procesoEnEjecucion.estado = 'Terminado';
                this.procesoEnEjecucion.tiempoFinalizacion = this.reloj; /*establecer tiempo finalizacion*/
                this.procesosTerminados.push(this.procesoEnEjecucion);
                this.procesoEnEjecucion = null;
            }
        }

        if (this.procesoEnEjecucion && isError) { /*hay error*/
            this.procesoEnEjecucion.error = true;
            this.procesoEnEjecucion.estado = 'Terminado';               /*establecer tiempo finalizacion*/
            this.procesoEnEjecucion.tiempoFinalizacion = this.reloj;
            this.procesosTerminados.push(this.procesoEnEjecucion);
            this.procesoEnEjecucion = null;
        }


        if (this.procesoEnEjecucion && isInterrupcion) { /*hay interrupción (pasa a bloqueados)*/
            this.procesoEnEjecucion.estado = 'Bloqueado';
            this.procesosBloqueados.push(this.procesoEnEjecucion);
            this.procesoEnEjecucion = null;

            const proceso = this.procesosListos.shift();
            if (proceso) { 
                proceso.estado = 'Ejecucion'; 
                this.procesoEnEjecucion = proceso; /*ponemos el siguiente de listos en ejecucion*/ 
                if (proceso.tiempoRespuesta === 0) { 
                    proceso.tiempoRespuesta = this.reloj; 
                }
            } /*establecer tiempo respuesta la primera vez*/
        }
        
        this.manejarProcesosBloqueados();
        if (isComenzado) { this.incrementarTiemposGenerales(); } /*aumentar reloj*/
        const nuevoEstado = { ...this };
        return nuevoEstado;
    }

    private checarMemoriaLlena = () => {
        if (this.procesosListos.length !== CONSTANTE_MEMORIA && this.procesosNuevos.length !== 0) {
            let proceso = this.procesosNuevos.shift();
            if (proceso) {
                proceso.estado = 'Listo';
                proceso.tiempoLlegada = this.reloj /*establecer tiempo de llegada*/;
            }
            if (proceso) { this.procesosListos.push(proceso); return true; /*regresar*/ }
        }
        return false;
    }

    private manejarProcesosBloqueados = () => {
        const nuevoArregloBloqueados: Proceso[] = [];
        if (this.procesosBloqueados.length) { 

            this.procesosBloqueados.forEach(proceso => {
                proceso.tiempoBloqueado++;
                if (proceso.tiempoBloqueado >= CONSTANTE_TIEMPO_BLOQUEADO) {
                    proceso.estado = 'Nuevo';
                    this.procesosNuevos.push(proceso);
                } else {
                    nuevoArregloBloqueados.push(proceso);
                }
            })

        }
        this.procesosBloqueados = nuevoArregloBloqueados;
    }

    private incrementarTiemposGenerales = () => {
        this.reloj++;

        /*establecer tiempo de espera para procesos nuevos, listos o bloqueados*/
        this.procesosNuevos.forEach(proceso => proceso.tiempoEspera++);
        this.procesosListos.forEach(proceso => proceso.tiempoEspera++);
        this.procesosBloqueados.forEach(proceso => proceso.tiempoEspera++);

        /*establecer tiempo retorno para todos los procesos que no hayan sido terminados*/
        if (this.procesoEnEjecucion) { this.procesoEnEjecucion.tiempoRetorno++; }
        this.procesosBloqueados.forEach(proceso => proceso.tiempoRetorno++);
        this.procesosNuevos.forEach(proceso => proceso.tiempoRetorno++);
        this.procesosListos.forEach(proceso => proceso.tiempoRetorno++);

    }

    // --- Getters ----------------------------------------------------------------------------------------------------
    public imprimirSO = () => { console.log(this); }
    public getCantidadProcesos = (): number => { return this.cantidadProcesos; }
    public getProcesoEnEjecucion = (): Proceso | null => { return this.procesoEnEjecucion; }
    public getProcesosBloqueados = (): Proceso[] => { return this.procesosBloqueados; }
    public getProcesosNuevos = (): Proceso[] => { return this.procesosNuevos; }
    public getProcesosTerminados = (): Proceso[] => { return this.procesosTerminados; }
    public getReloj = (): number => { return this.reloj; }
    public getProcesosListos = (): Proceso[] => { return this.procesosListos; }

    // --- Setters ----------------------------------------------------------------------------------------------------
    public setCantidadProcesos = (cantidad: number): SistemaOperativo => {
        this.cantidadProcesos = cantidad;
        const nuevoEstado = { ...this };
        return nuevoEstado;
    }

}