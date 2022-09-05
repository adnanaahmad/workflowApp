import {BrowserModule} from '@angular/platform-browser';

/* Routing */
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

/* Angular Material */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from '@angular/material';


/* FormsModule */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/* Angular Flex Layout */
import {FlexLayoutModule} from '@angular/flex-layout';

/* Components */
import {LogInComponent} from './auth/components/log-in/log-in.component';
import {RegisterComponent} from './auth/components/register/register.component';

import {HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TaskComponent} from './navigation/components/common/task/task.component';
import {ToasterComponent} from './navigation/components/common/toaster/toaster.component';
import {EditComponent} from './navigation/components/common/edit/edit.component';
import {LayoutModule} from '@angular/cdk/layout';
import {NavigationModule} from './navigation/navigation.module';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ToasterComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    DragDropModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NavigationModule,
  ],
  entryComponents: [TaskComponent, ToasterComponent, EditComponent],
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {
      duration: 2500,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    }
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
