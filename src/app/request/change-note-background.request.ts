export class ChangeNoteBackgroundRequest {
  public noteId: string;
  public backgroundName: string;
  public type: string;

  constructor(noteId: string, backgroundName: string, type: string) {
    this.noteId = noteId;
    this.backgroundName = backgroundName;
    this.type = type;
  }
}
