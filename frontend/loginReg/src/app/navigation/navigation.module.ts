import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NavigationRoutingModule} from './navigation-routing.module';
import {AngularMaterialModule} from '../angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutModule} from '@angular/cdk/layout';
import {BoardComponent} from './components/board/board.component';
import {NavigationComponent} from './navigation.component';
import { NotesComponent } from './components/notes/notes.component';
import { EditNotesComponent } from './components/common/edit-notes/edit-notes.component';
import { AddNotesComponent } from './components/common/add-notes/add-notes.component';
import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';


@NgModule({
  declarations: [
    BoardComponent,
    NavigationComponent,
    NotesComponent,
    EditNotesComponent,
    AddNotesComponent,
    WhiteboardComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    DragDropModule,
    LayoutModule,
    CanvasWhiteboardModule,
  ],
  entryComponents: [EditNotesComponent, AddNotesComponent]
})
export class NavigationModule {
}
