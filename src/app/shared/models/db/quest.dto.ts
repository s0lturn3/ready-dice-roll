export interface QuestDto {
    Id: number;
    CampanhaId: number;
    Nome: string;
    Descricao: string;
    DtCriacao: string;
    DtAtualizacao?: string;
    Status: number;
}