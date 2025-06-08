export interface VersaoRegistroDto {
    Id: number;
    RegistroId: number;
    Versao: number;
    ConteudoAntigo: string;
    DtModificacao: Date;
    ModificadoPor: string;
}