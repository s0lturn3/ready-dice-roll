export interface ItemDto {
    Id: number;
    CampanhaId: number;
    Nome: string;
    Descricao: string;
    TipoItemId?: number;
    Raridade?: string;
    Valor?: number;
    Peso?: number;
    DtCriacao: string;
}