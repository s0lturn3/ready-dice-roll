export interface DadosPersonagemDto {
    Id: number;
    PersonagemId: number;
    HPMax: number;
    HPAtual: number;
    MPMax: number;
    MPAtual: number;
    XP: number;
    Nivel: number;

    RacaId?: number;
    ClasseId?: number;
}