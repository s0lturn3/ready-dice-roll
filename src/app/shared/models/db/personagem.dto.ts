export interface PersonagemDto {
    Id: number;
    Nome: string;
    Historia?: string;
    Nivel: number;
    IsNpc: number;
    CriadoPor: string;
    ControladoPor: string;
    CampanhaId?: number;
}