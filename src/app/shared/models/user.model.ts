export class User {
   id?: string = "";
   username: string = "";
   email: string = "";
   senha: string = "";

   dtCriacao?: Date | string = "";
   dtUltimoLogin?: Date | string = "";

   googleId?: string = "";
   githubId?: string = "";
   microsoftId?: string = "";
}