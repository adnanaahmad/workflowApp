import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ToasterComponent} from '../common/toaster/toaster.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AddNotesComponent} from '../common/add-notes/add-notes.component';
import {EditNotesComponent} from '../common/edit-notes/edit-notes.component';
import {NoticeService} from '../notesServices/notice.service';
import {CdkDrag, CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit, AfterViewInit {
  notes = [];
  notesList = [];
  dragPosition: any;

  constructor(public dialog: MatDialog, private noteService: NoticeService, private snackbar: MatSnackBar) {
    this.viewNote();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.notes.forEach((note, index) => {
        const element = document.getElementById('L' + index);
        //element.dragPosition = {x: note.x, y: note.y};
        console.log(element);
      });
    }, 200);
  }

  viewNote() {
    this.notesList = [];
    this.noteService.noteInfo().subscribe(res => {
      this.notes = res;
      console.log(this.notes);
      this.notes.forEach((result) => {
        const note = {
          id: result.id,
          content: result.content,
          axis: {x: parseInt(result.x, 10), y: parseInt(result.y, 10)},
          member: result.member
        };
        this.notesList.push(note);
      });
      console.log(this.notesList, 'this is a list');
    }, (error) => {
      console.log(error);
    });

  }

  addNote() {
    const dialogRef = this.dialog.open(AddNotesComponent,
      {panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(res => {
      if (res ? res.status === 'YES' : false) {
        this.noteService.addNote(res.data).subscribe(result => {
          res.data.id = result;
          console.log(res.data);
          this.viewNote();
          this.snackbar.openFromComponent(ToasterComponent,
            {data: 'New note is added'});
        });
      }
    });
  }

  editNote() {
    const dialogRef = this.dialog.open(EditNotesComponent,
      {panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(res => {
      if (res ? res.status === 'YES' : false) {
        // this.service.AddTask(res.data).subscribe( result => {
        //   this.snackbar.openFromComponent(ToasterComponent,
        //     {data: 'New task is added in To do list'});
        // });
      }
    });
  }

  saveNote(data) {
    this.noteService.saveNote(data).subscribe(res => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
  }

  drop(event: CdkDragEnd, index) {
    this.notes[index].x = event.source.getFreeDragPosition().x;
    this.notes[index].y = event.source.getFreeDragPosition().y;
    this.saveNote(this.notes[index]);
  }

}
