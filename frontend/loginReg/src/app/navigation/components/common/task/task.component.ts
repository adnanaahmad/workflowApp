import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  TaskForm = new FormGroup({
    task: new FormControl('', Validators.required),
    status: new FormControl(''),
    member_id: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MatDialogModule) public data: any) {}

  onNoClick(): string {
    return 'NO';
  }
  createTask(): any {
    this.TaskForm.value.member_id = localStorage.getItem('id');
    this.TaskForm.value.status = 'TD';
    this.data = this.TaskForm.value;
    return {status: 'YES', data: this.data};
  }

  ngOnInit() {
  }

}
