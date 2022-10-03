import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteDTO} from "../../../../dto/note.dto";
import {NoteBackgroundDTO} from "../../../../dto/note-background.dto";
import {ChangeNoteBackgroundRequest} from "../../../../request/change-note-background.request";
import {NoteService} from "../../../../services/note.service";
import {MatDialog} from "@angular/material/dialog";
import {NoteDetailsDialogComponent} from "../note-details-dialog/note-details-dialog.component";

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input('note') note: NoteDTO;
  @Input('isEditable') isEditable: boolean;
  @Output('addToArchive') addToArchiveEvent = new EventEmitter<string>()
  @Output('removeFromArchive') removeFromArchiveEvent = new EventEmitter<string>()
  public isOnFocus: boolean;
  public currentFocusedNoteId: string | undefined;
  public isDetailsDialogOpened: boolean;

  constructor(private noteService: NoteService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
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
        this.addToArchiveEvent.emit(noteId);
        console.log('Added to archive');
      }
    )
  }

  /**
   * Removes note from archive
   *
   * @param noteId which will be added to archive
   */
  public handleRemoveFromArchive(noteId: string): void {
    this.noteService.removeNoteFromArchive(noteId).subscribe(
      () => {
        this.removeFromArchiveEvent.emit(noteId);
      }
    )
  }

  /**
   * Hides additional elements
   */
  public hideElements(): void {
    this.isOnFocus = false;
    this.currentFocusedNoteId = undefined;
  }

  public showNoteDetails(): void {
    const noteDetailsDialog = this.dialog.open(NoteDetailsDialogComponent, {
      data: this.note,
      panelClass: 'note__details'
    });
    this.isDetailsDialogOpened = true;
    noteDetailsDialog.afterClosed().subscribe(
      () => {
        this.isDetailsDialogOpened = false;
      }
    )
  }

  /**
   * Sets marked flag for note
   *
   * @param event to stop propagation
   */
  public markNote(event: MouseEvent) {
    event.stopPropagation();
    this.noteService.setMarked(this.note.id).subscribe(
      () => {
        this.note.isMarked = !this.note.isMarked;
      }
    )
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
}
