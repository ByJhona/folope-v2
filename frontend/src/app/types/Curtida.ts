export interface Curtida {
  id?: number;
  idAlvo: number;
  alvo: CurtidaAlvoEnum;
}

export enum CurtidaAlvoEnum {
  FILME = 'FILME',
  COMENTARIO = 'COMENTARIO',
}
