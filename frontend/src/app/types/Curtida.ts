export interface Curtida {
  id?: number;
  idAlvo: number;
  alvo: CurtidaAlvoEnum;
  data: Date;
}

export enum CurtidaAlvoEnum {
  FILME = 'FILME',
  COMENTARIO = 'COMENTARIO',
}
