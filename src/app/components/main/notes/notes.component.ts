import {Component, OnInit} from '@angular/core';
import { NoteBackgroundDTO } from 'src/app/dto/note-background.dto';
import { NoteDTO } from 'src/app/dto/note.dto';
import {NoteService} from "../../../services/note.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public notes: NoteDTO[];

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getNotes();
    this.getNotesAfterCreate();
  }

  /**
   * Gets user notes
   */
  private getNotes() {
    this.noteService.getNotes().subscribe(
      res => {
        this.notes = res;
      }
    )
  }

  /**
   * Handle notes after creating and adds it to array
   */
  private getNotesAfterCreate(): void {
    this.noteService.notes.subscribe(
      res => {
        if(res){
          this.notes.push(res);
        }
      }
    );
  }

}
