import {Component, OnInit} from '@angular/core';
import {NoteBackgroundDTO} from 'src/app/dto/note-background.dto';
import {NoteDTO} from 'src/app/dto/note.dto';
import {NoteService} from "../../../services/note.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public notes: NoteDTO[];
  public isOnFocus: boolean;
  public currentFocusedNoteId: string | undefined;

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getNotes();
    this.getNotesAfterCreate();
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
  }

  /**
   * Set visiibility to visible for hidden elements
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
