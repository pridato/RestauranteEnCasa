export interface IComida {
  id: string;
    nombre: string;
    tipo: string;
    ingredientes: string[];
    especificacion: string;
    informacionAdicional: {
        calorias: number;
        grasas: number;
        proteinas: number;
        carbohidratos: number;
    };
    precio: number;
    imagenBASE64?: string;
}