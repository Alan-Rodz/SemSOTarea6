// ********************************************************************************
export const operacionesValidas: Operacion[] = ['+', '-', '/', '*', '%'];
export type Operacion = '+' | '-' | '/' | '*' | '%';

export type Estado = 'Nuevo'| 'Listo' | 'Ejecucion' | 'Bloqueado' | 'Terminado';

export class Proceso {    
    ID: number;
    tiempoMaximoEstimado: number;
    tiempoRestante: number;
    tiempoTotal: number;
    operacion: Operacion;
    operando1: number; 
    operando2: number; 
    resultado: number; 
    estado: Estado;
    error: boolean

    constructor(ID: number, tiempoMaximoEstimado: number, tiempoRestante: number, tiempoTotal: number, operacion: Operacion, operando1: number,  operando2: number,  resultado: number,  estado: Estado, error: boolean ){
        this.ID = ID;
        this.tiempoMaximoEstimado = tiempoMaximoEstimado;
        this.tiempoRestante = tiempoRestante;
        this.tiempoTotal = tiempoTotal;
        this.operacion = operacion;
        this. operando1 = operando1;
        this.operando2 = operando2;
        this.resultado = resultado;
        this.estado = estado;
        this.error = error;
    }

}