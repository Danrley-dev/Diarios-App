import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule, 
    MatMenuModule
  ],
  exports: [ 
    NavbarComponent
  ],
})
export class CoreModule {}

