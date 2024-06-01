export enum TipoComidaImagen {
  PIZZA = 'assets/images/pizza.png',
  ENSALADA = 'assets/images/ensalada.png',
  SOPA = 'assets/images/sopa.png',
  HAMBURGUESA = 'assets/images/hamburguesa.png',
  POLLO = 'assets/images/pollo.png',
  SUSHI = 'assets/images/sushi.png',
  POSTRE = 'assets/images/postre.png',
  BEBIDA = 'assets/images/bebida.png',
  FRUTA = 'assets/images/fruta.png', 
  'COMIDAS RAPIDAS' = 'assets/images/rapido.png'
}

export type TipoComidaKeys = keyof typeof TipoComidaImagen;