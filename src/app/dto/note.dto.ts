import {NoteBackgroundDTO} from "./note-background.dto";

export class NoteDTO {
  private _id: string;
  private _title: string;
  private _text: string;
  private _isMarked: boolean;
  private _backgroundColor: NoteBackgroundDTO;
  private _backgroundImage: NoteBackgroundDTO;
  private _isArchived: boolean;
  private _order: number;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get isMarked(): boolean {
    return this._isMarked;
  }

  set isMarked(value: boolean) {
    this._isMarked = value;
  }

  get backgroundColor(): NoteBackgroundDTO {
    return this._backgroundColor;
  }

  set backgroundColor(value: NoteBackgroundDTO) {
    this._backgroundColor = value;
  }

  get backgroundImage(): NoteBackgroundDTO {
    return this._backgroundImage;
  }

  set backgroundImage(value: NoteBackgroundDTO) {
    this._backgroundImage = value;
  }

  get isArchived(): boolean {
    return this._isArchived;
  }

  set isArchived(value: boolean) {
    this._isArchived = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }
}
