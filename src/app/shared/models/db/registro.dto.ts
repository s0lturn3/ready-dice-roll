export interface RegistroDto {
    Id: number;
    Titulo: string;
    Conteudo: string;
    Autor?: string;
    CampanhaId: number;
    DtCriacao: string;
    TipoDocumentoId: number;
}