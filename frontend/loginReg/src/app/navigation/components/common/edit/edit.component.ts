import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BoardService} from '../../boardServices/board.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {
  taskData = {task: '', status: ''};
  types = ['TD', 'D', 'T'];
  fullForm = {TD: 'Todo', D: 'Done', T: 'Test'};

  EditForm = new FormGroup({
    task: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    member_id: new FormControl(localStorage.getItem('id'))
  });

  constructor(public dialogRef: MatDialogRef<EditComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private cdr: ChangeDetectorRef,
              private service: BoardService) {
    setTimeout(() => {
      this.service.clickedTask.subscribe(res => {
        this.EditForm.get('task').setValue(res.task);
        this.EditForm.get('status').setValue(res.status);
      });
      this.cdr.markForCheck();
    }, 0);
  }

  ngOnInit() {

  }
  onNoClick(): string {
    return 'NO';
  }
  edit(): any {
    return {status: 'YES', data: this.EditForm.value};
  }
  delete(): any {
    return {status: 'DELETE', data: this.EditForm.value};
  }
}
