import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BoardService} from '../boardServices/board.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TaskComponent} from '../common/task/task.component';
import {ToasterComponent} from '../common/toaster/toaster.component';
import {MatSnackBar} from '@angular/material';
import {EditComponent} from '../common/edit/edit.component';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  todo = [];
  done = [];
  test = [];
  task: any;
  boardDictionary = {
    TD : 'todo',
    D : 'done',
    T : 'test'
  };
  private token: string;
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.save();
    }
  }
  constructor(private service: BoardService, private router: Router,
              public dialog: MatDialog, private snackbar: MatSnackBar,
              private breakpointObserver: BreakpointObserver) {

  }
  ngOnInit() {
    this.service.boardInfo().subscribe(res => {
      this.todo = res.TD.map(a => a.task);
      this.done = res.D.map(b => b.task);
      this.test = res.T.map(c => c.task);
    }, (error) => {
      console.log(error);
    });
  }
  save() {
    const data = {
      TD : this.todo,
      D : this.done,
      T : this.test
    };
    this.service.saveBoard(data).subscribe(res => {
      this.snackbar.openFromComponent(ToasterComponent,
        {data: 'Your project is saved'});
    }, error => {
      this.snackbar.openFromComponent(ToasterComponent,
        {data: 'Failed to save changes'});
    });
  }

  AddTask() {
    const dialogRef = this.dialog.open(TaskComponent,
      { panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(res => {
      if (res ?  res.status === 'YES' : false) {
        this.todo.push(res.data.task);
        this.service.AddTask(res.data).subscribe( result => {
          this.snackbar.openFromComponent(ToasterComponent,
            {data: 'New task is added in To do list'});
        });
      }
    });
  }
  EditTask(curentTask: any, taskType: any, index: any) {
    const taskData = {
      task: curentTask,
      status: taskType,
    };
    const dialogRef = this.dialog.open(EditComponent,
      {panelClass: 'custom-dialog-edit',
      data: taskData});
    this.service.UpdateCurrentTask({task: taskData.task, status: taskData.status});
    dialogRef.afterClosed().subscribe(res => {
      if (res ?  res.status === 'YES' : false) {
        // if they belong to same list just replace else delete and add
        if (taskData.status === res.data.status) {
          const array = this.boardDictionary[taskData.status];
          this[array][index] = res.data.task;
        } else {
          const oldArray = this.boardDictionary[taskData.status];
          this[oldArray].splice(index, 1)
          const newArray = this.boardDictionary[res.data.status];
          this[newArray].push(res.data.task);
        }
        const data = {
          task: taskData.task,
          status: taskData.status,
          member_id: res.data.member_id,
          newTask: res.data.task,
          newStatus: res.data.status
        }
        this.service.EditTask(data).subscribe(res1 => {
          this.snackbar.openFromComponent(ToasterComponent,
            {data: 'Task edited successfully'});
        }, error1 => {
          this.snackbar.openFromComponent(ToasterComponent,
            {data: 'Failed to edit task'});
        });
      } else if (res ?  res.status === 'DELETE' : false) {
        this.service.DeleteTask(res.data).subscribe(res1 => {
          const oldArray = this.boardDictionary[taskData.status];
          this[oldArray].splice(index, 1)
          this.snackbar.openFromComponent(ToasterComponent,
            {data: 'Task edited successfully'});
        }, error1 => {
          this.snackbar.openFromComponent(ToasterComponent,
            {data: 'Failed to edit task'});
        });
      }
    });
  }
}
