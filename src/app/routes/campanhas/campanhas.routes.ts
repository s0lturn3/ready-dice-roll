import { Routes } from "@angular/router";

import { CampanhaDetailComponent } from "./components/campanha-detail/campanha-detail.component";
import { CampanhasListComponent } from "./components/campanhas-list/campanhas-list.component";
import { HabilidadesListComponent } from "./components/habilidades-list/habilidades-list.component";

export const CAMPANHAS_ROUTES: Routes = [
  { path: '', title: 'Campanhas do usuário', component: CampanhasListComponent },
  { path: 'info/:id', title: 'Informações da campanha', component: CampanhaDetailComponent },

  { path: 'characters/:id', title: 'Personagens da campanha', component: CampanhaDetailComponent },
  { path: 'players/:id', title: 'Jogadores da campanha', component: CampanhaDetailComponent },
  { path: 'skills/:id', title: 'Habilidades da campanha', component: HabilidadesListComponent },
  { path: 'maps/:id', title: 'Mapas da campanha', component: CampanhaDetailComponent },
];