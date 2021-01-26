import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RolesService } from './shared/services/roles.service';
import { HttpClientModule } from '@angular/common/http';
import { IfRolesDirective } from './shared/directives/if-roles.directive';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, IfRolesDirective ],
  providers: [ RolesService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
