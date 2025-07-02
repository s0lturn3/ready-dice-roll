export interface BestiarioDto {
    Id: number;
    CampanhaId?: number;
    Nome: string;
    Descricao: string;
    TipoCriaturaId: number;
    Nivel?: number;
    DtCriacao: string;
}