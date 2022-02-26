import { Estado, Operacion, operacionesValidas, Proceso } from './Proceso';
import { generarNumeroAleatorio } from '../util/generarNumeroAleatorio'

// ********************************************************************************
export class SistemaOperativo {    
    private cantidadProcesos: number;
    private procesoEnEjecucion: Proceso | null;
    private procesosBloqueados: Proceso[];
    private procesosNuevos: Proceso[];
    private procesosTerminados: Proceso[];
    private reloj: number; 
    private procesosListos: Proceso[];

    constructor( cantidadProcesos: number, procesoEnEjecucion: Proceso | null, procesosBloqueados: Proceso[], procesosNuevos: Proceso[], procesosTerminados: Proceso[], reloj: number,  procesosListos: Proceso[],) {
        this.cantidadProcesos = cantidadProcesos;
        this.procesoEnEjecucion = procesoEnEjecucion,
        this.procesosBloqueados = procesosBloqueados;
        this.procesosNuevos = procesosNuevos;
        this.procesosTerminados = procesosTerminados;
        this.reloj = reloj;
        this.procesosListos = procesosListos;
    }

    // --- Estado ----------------------------------------------------------------------------------------------------
    public inicializar = () => {
        for (let i = 0; i < this.cantidadProcesos; i++) {
            const idGenerado = i+1; 
            const tmeGenerado = Math.floor(Math.random() * (16 - 6) + 6);
            const trGenerado = tmeGenerado;
            const ttGenerado = 0;

            const opGenerada: Operacion = operacionesValidas[Math.floor(Math.random()*operacionesValidas.length)];
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
            
            else if (opGenerada === '/') {
                let bandera = true; 
                while (bandera === true) {
                    op1Generado = generarNumeroAleatorio();
                    op2Generado = generarNumeroAleatorio();                
                    if (op1Generado !== 0 && op2Generado !== 0) { bandera = false; }
                }
            } 
            
            else if (opGenerada === '%') {
                let bandera = true; 
                while (bandera === true) {
                    op1Generado = generarNumeroAleatorio();
                    op2Generado = generarNumeroAleatorio();                
                    if (op1Generado !== 0 && op2Generado !== 0) { bandera = false; }
                }
            }

            let resultadoGenerado = 0;
            if (opGenerada === '+') {
                resultadoGenerado = op1Generado + op2Generado;
            } 
            
            else if (opGenerada === '-') {
                resultadoGenerado = op1Generado - op2Generado;
            } 
            
            else if (opGenerada === '/') {
                resultadoGenerado = op1Generado / op2Generado;
            } 
            
            else if (opGenerada === '%') {
                resultadoGenerado = op1Generado % op2Generado;
            }

            const estadoGenerado: Estado = 'Nuevo';
            const errorGenerado = false;

            const nuevoProceso = new Proceso(idGenerado, tmeGenerado, trGenerado, ttGenerado, opGenerada,  op1Generado, op2Generado, resultadoGenerado, estadoGenerado, errorGenerado);
            this.procesosListos.push(nuevoProceso);
        }
    } 

    // --- Getters ----------------------------------------------------------------------------------------------------
    public imprimirSO = () => {
        console.log(this);
    }

    public getCantidadProcesos = (): number => {
        return this.cantidadProcesos;
    }

    // --- Setters ----------------------------------------------------------------------------------------------------
    public setCantidadProcesos = (cantidad: number): void => {
        this.cantidadProcesos = cantidad;
    }

}