export interface HabilidadeDto {
    Id: number;
    CampanhaId: number;
    Nome: string;
    DescricaoCurta: string;
    DescricaoCompleta: string;
    Tipo: number;
    Icone?: string;
    Nivel: number;
    HabilidadeDependenciaId?: number;
    DataCriacao: string;

    ExclusivaClasseId?: number;
    ExclusivaRacaId?: number;

    posX?: number;
    posY?: number;
}