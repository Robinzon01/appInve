import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
// import { AuthGuard } from './guards/auth.guard';
import { CompanyComponent } from './pages/company/company.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { LartiComponent } from './pages/larti/larti.component';
import { DartiComponent } from './pages/larti/darti/darti.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'company',  component: CompanyComponent },
  { path: 'usuario',  component: UsuarioComponent },
  { path: 'articulo',  component: LartiComponent },
  { path: 'articulo/page/:page',  component: LartiComponent },
  { path: 'articulo/show/:cod', component: DartiComponent },
  { path: 'usuario/page/:page', component: UsuarioComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
