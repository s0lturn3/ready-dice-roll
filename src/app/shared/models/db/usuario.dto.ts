export interface UsuarioDtoRecord {
   Id: string;
   Username: string;
   Email: string;
   Senha: string;
   DtUltimoLogin: Date;
   DtCriacao: Date;
   GoogleId: string;
   GithubId: string;
   MicrosoftId: string;

   Imagem?: string;
}