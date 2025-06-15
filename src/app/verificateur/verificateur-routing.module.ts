import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificateurComponent } from './verificateur.component';
import { ListBordereauComponent } from './components/list-bordereau/list-bordereau.component';
import { VerificationComponent } from './components/verification/verification.component';
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';
import { ListRequeteComponent } from './components/list-requete/list-requete.component';
import { ListReponseComponent } from './components/list-reponse/list-reponse.component';
import { HomeSiComponent } from './components/home-si/home-si.component';
import { HistoVerificateurComponent } from './components/histo-verificateur/histo-verificateur.component';

const routes: Routes = [
  {path:"", component:VerificateurComponent, children: [
    {path:"", component: HomeComponent},
    {path:"list", component: ListBordereauComponent},
    {path:"check", component: VerificationComponent},
    {path:"histo", component: HistoVerificateurComponent},
    {path :"home-si", component:HomeSiComponent},
    {path:"data", component: DataComponent},
    {path:"list-requete", component: ListRequeteComponent},
    {path:"list-reponse", component: ListReponseComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificateurRoutingModule { }
