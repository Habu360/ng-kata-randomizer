import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleListComponent } from './style-list/style-list.component';
import { QuotesComponent } from './quotes/quotes.component';
import { KataListComponent } from './kata-list/kata-list.component';

const routes: Routes = [
  { path: 'home', component: StyleListComponent, title: "Home - Kata Randomizer" },
  { path: 'quotes', component: QuotesComponent, title: "Quotes - Kata Randomizer" },
  { path: 'kata/:style', component: KataListComponent, title: "Kata - Kata Randomizer" },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
