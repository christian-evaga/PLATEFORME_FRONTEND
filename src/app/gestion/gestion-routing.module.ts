import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './gestion.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { BordereauxComponent } from './components/bordereaux/bordereaux.component';
import { AddBordereauComponent } from './components/add-bordereau/add-bordereau.component';
import { ReponsesComponent } from './components/reponses/reponses.component';
import { DetailBordereauComponent } from './components/detail-bordereau/detail-bordereau.component';
import { UsersComponent } from './components/admin/components/users/users.component';
import { ReponsesRecusComponent } from './components/admin/components/reponses-recus/reponses-recus.component';
import { CreateUserComponent } from './components/admin/components/create-user/create-user.component';
import { InfoBordereauRecuComponent } from './components/admin/components/info-bordereau-recu/info-bordereau-recu.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  {path:"", component:GestionComponent, children: [
    {path:"", component:HistoriqueComponent},
    {path:"bordereaux", component:BordereauxComponent},
    {path:"add-bordereau", component:AddBordereauComponent},
    {path:"reponses", component:ReponsesComponent},
    {path:"detail-bordereau", component:DetailBordereauComponent},
    {path:"admin", component:UsersComponent},
    {path:"admin/reponses-recues", component:ReponsesRecusComponent},
    {path:"admin/create-user", component: CreateUserComponent},
    {path:"admin/info-bordereau-recu", component : InfoBordereauRecuComponent},
    {path:"profil", component : ProfilComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
