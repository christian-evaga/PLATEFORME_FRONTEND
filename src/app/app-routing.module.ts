import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path:"", 
        loadChildren: () => import('../app/auth/auth.module').then((m) => m.AuthModule)},
    {path:"gestion",
        loadChildren: () => import('../app/gestion/gestion.module').then((m) => m.GestionModule)
    },
    {path:"verificateur",
        loadChildren: () => import('../app/verificateur/verificateur.module').then((m) => m.VerificateurModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}  