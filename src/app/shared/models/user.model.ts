export interface User {
   Id?: string;
   Username: string;
   Email: string;
   Senha: string;

   DtCriacao?: Date | string;
   DtUltimoLogin?: Date | string;

   GoogleId?: string;
   GithubId?: string;
   MicrosoftId?: string;
}