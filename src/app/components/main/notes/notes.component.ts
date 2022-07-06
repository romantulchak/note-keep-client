import {Component, OnInit} from '@angular/core';
import {NoteService} from "../../../services/note.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getNotes();
  }

  /**
   * Gets user notes
   */
  private getNotes() {
    this.noteService.getNotes().subscribe(
      res => {
        console.log(res)
      }
    )
  }

}
