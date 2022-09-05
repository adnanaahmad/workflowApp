import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BoardComponent} from './components/board/board.component';
import {NavigationComponent} from './navigation.component';
import {NotesComponent} from './components/notes/notes.component';
import {WhiteboardComponent} from './components/whiteboard/whiteboard.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: BoardComponent,
        pathMatch: 'full'
      },
      {
        path: 'notes',
        component: NotesComponent
      },
      {
        path: 'whiteboard',
        component: WhiteboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {
}
