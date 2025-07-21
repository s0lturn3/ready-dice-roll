export interface ComentarioRegistroDto {
    Id: number;
    RegistroId: number;
    UsuarioId: string;
    Conteudo: string;
    DtCriacao: Date;
}