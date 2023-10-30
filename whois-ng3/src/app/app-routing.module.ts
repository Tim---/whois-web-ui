import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SingleObjectComponent } from './single-object/single-object.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: ':source/:type/:pkey',
    component: SingleObjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
