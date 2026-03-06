import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { FormComponent } from './views/form/form.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'form',
    component: FormComponent
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];