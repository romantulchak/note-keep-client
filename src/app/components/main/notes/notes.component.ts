import {Component, OnInit} from '@angular/core';
import {NoteBackgroundDTO} from 'src/app/dto/note-background.dto';
import {NoteDTO} from 'src/app/dto/note.dto';
import {NoteService} from "../../../services/note.service";
import {ChangeNoteBackgroundRequest} from "../../../request/change-note-background.request";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public notes: NoteDTO[];
  public isOnFocus: boolean;
  public currentFocusedNoteId: string | undefined;

  constructor(private noteService: NoteService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRouteType();
  }

  /**
   * Handle selected value from {@link NoteBackgroundPickerComponent}
   * and sets it for Note backgroundImage field
   *
   * @param noteBackgroundDTO to get @Output from component
   * @param note for which background will be set
   */
  public handleBackgroundImage(noteBackgroundDTO: NoteBackgroundDTO, note: NoteDTO): void {
    note.backgroundImage.fullPathToImage = noteBackgroundDTO.fullPathToImage;
    const changeNoteBackgroundRequest = new ChangeNoteBackgroundRequest(note.id, noteBackgroundDTO.name, 'IMAGE');
    this.changeBackground(changeNoteBackgroundRequest);
  }

  /**
   * Handle selected value from {@link NoteBackgroundPickerComponent}
   * and sets it for Note backgroundColor field
   *
   * @param noteBackgroundDTO to get @Output from component
   * @param note for which background will be set
   */
  public handleBackgroundColor(noteBackgroundDTO: NoteBackgroundDTO, note: NoteDTO): void {
    note.backgroundColor.value = noteBackgroundDTO.value;
    const changeNoteBackgroundRequest = new ChangeNoteBackgroundRequest(note.id, noteBackgroundDTO.name, 'COLOR');
    this.changeBackground(changeNoteBackgroundRequest);
  }

  /**
   * Adds note to archive
   *
   * @param noteId which will be added to archive
   */
  public handleAddToArchive(noteId: string): void {
    this.noteService.addNoteToArchive(noteId).subscribe(
      () => {
        this.notes = this.notes.filter(note => note.id !== noteId);
        console.log('Added to archive');
      }
    )
  }

  /**
   * Set visibility to visible for hidden elements
   *
   * @param note to show hidden elements for current note
   */
  public showHiddenElements(note: NoteDTO): void {
    this.isOnFocus = true;
    this.currentFocusedNoteId = note.id;
  }

  /**
   * Hides additional elements
   */
  public hideElements(): void {
    this.isOnFocus = false;
    this.currentFocusedNoteId = undefined;
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

  private getNotesByLabel(): void {
    const labelName = this.route.snapshot.params.name;
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
   * Sends request to server to change note background
   *
   * @param changeNoteBackgroundRequest contains info about note and background
   */
  private changeBackground(changeNoteBackgroundRequest: ChangeNoteBackgroundRequest): void {
    this.noteService.changeBackground(changeNoteBackgroundRequest).subscribe(
      () => {
        console.log('Changed')
      });
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
