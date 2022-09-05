import {ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BoardService} from '../../boardServices/board.service';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.css']
})
export class EditNotesComponent implements OnInit {

  EditNoteForm = new FormGroup({
    note: new FormControl('', Validators.required),
    member_id: new FormControl(localStorage.getItem('id'))
  });

  constructor(public dialogRef: MatDialogRef<EditNotesComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private cdr: ChangeDetectorRef,
              private service: BoardService) {
    // setTimeout(() => {
    //   this.service.clickedTask.subscribe(res => {
    //     this.EditForm.get('task').setValue(res.task);
    //     this.EditForm.get('status').setValue(res.status);
    //   });
    //   this.cdr.markForCheck();
    // }, 0);
  }

  ngOnInit() {

  }
  onNoClick(): string {
    return 'NO';
  }
  edit(): any {
    return {status: 'YES', data: this.EditNoteForm.value};
  }
  delete(): any {
    return {status: 'DELETE', data: this.EditNoteForm.value};
  }
}
