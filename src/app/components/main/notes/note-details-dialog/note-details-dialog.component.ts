import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NoteDTO} from "../../../../dto/note.dto";

@Component({
  selector: 'app-note-details-dialog',
  templateUrl: './note-details-dialog.component.html',
  styleUrls: ['./note-details-dialog.component.scss']
})
export class NoteDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public note: NoteDTO) {
  }

  ngOnInit(): void {
  }

}
