import {Component, OnInit} from '@angular/core';
import {NoteDTO} from 'src/app/dto/note.dto';
import {NoteService} from "../../../services/note.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public notes: NoteDTO[];

  constructor(private noteService: NoteService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRouteType();
  }

  /**
   * Filter notes after add or remove note to/from archive
   *
   * @param noteId which will be added to archive
   */
  public filterNotesByArchived(noteId: string): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
  }

  /**
   * Gets user notes
   */
  private getNotes(): void {
    this.noteService.getNotes().subscribe(
      res => {
        this.notes = res;
      }
    )
  }

  /**
   * Gets user archived notes
   */
  private getArchivedNotes(): void {
    this.noteService.getArchivedNotes().subscribe(
      res => {
        this.notes = res;
      }
    );
  }

  /**
   * Handle notes after creating and adds it to array
   */
  private getNotesAfterCreate(): void {
    this.noteService.notes.subscribe(
      res => {
        if (res) {
          this.notes.push(res);
        }
      }
    );
  }

  /**
   * Gets route type according to this value there will be
   * different requests to the server
   */
  private getRouteType(): void {
    const type = this.route.snapshot.data['type'];
    if (type === 'ALL') {
      this.getNotes();
      this.getNotesAfterCreate();
    } else if (type === 'ARCHIVE') {
      this.getArchivedNotes();
    }
  }
}
