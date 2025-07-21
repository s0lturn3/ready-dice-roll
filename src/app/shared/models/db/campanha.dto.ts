export interface CampanhaDto {
    Id: number;
    Nome: string;
    Descricao?: string;
    CriadoPor: string;
    DtCriacao: string;
    DtUltAtualizacao?: string;
    Status: number;
    SistemaId?: number;
}