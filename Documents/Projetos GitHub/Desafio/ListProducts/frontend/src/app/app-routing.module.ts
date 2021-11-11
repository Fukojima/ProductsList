import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../app/components/create/create.component';
import { ListComponent } from '../app/components/list/list.component';

const routes: Routes = [
  {path:'create',component:CreateComponent},
  {path:'list',component:ListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
