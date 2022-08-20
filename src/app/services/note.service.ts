import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {NoteDTO} from "../dto/note.dto";
import {BackgroundDTO} from "../dto/backgorund.dto";
import {CreateNoteRequest} from "../request/create-note.request";
import {ChangeNoteBackgroundRequest} from "../request/change-note-background.request";

const API_URL = `${environment.apiUrl}/note`;

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public notes: Subject<NoteDTO> = new Subject();

  constructor(private http: HttpClient) {
  }


  /**
   * Send request to server to get user notes
   */
  public getNotes(page: number = 0): Observable<NoteDTO[]> {
    const params = new HttpParams().append('page', page);
    return this.http.get<NoteDTO[]>(API_URL, {params: params});
  }

  public getNotesByLabelName(labelName: string, page: number = 0) {

  }

  /**
   * Gets all backgrounds for note (colors and images)
   *
   * @returns backgrounds for note
   */
  public getBackgrounds(): Observable<BackgroundDTO> {
    return this.http.get<BackgroundDTO>(`${API_URL}/backgrounds`);
  }

  /**
   * Creates note by data from form
   *
   * @param createNoteRequest contains information about note which will be created
   * @returns NoteDTO object
   */
  public create(createNoteRequest: CreateNoteRequest): Observable<NoteDTO> {
    return this.http.post<NoteDTO>(`${API_URL}/create`, createNoteRequest);
  }

  /**
   * Changes background for note
   *
   * @param changeNoteBackgroundRequest contains info about note, background type and background value
   */
  public changeBackground(changeNoteBackgroundRequest: ChangeNoteBackgroundRequest): Observable<void> {
    return this.http.put<void>(`${API_URL}/change-background`, changeNoteBackgroundRequest);
  }

  /**
   * Adds note to archive
   *
   * @param noteId which will be added to archive
   */
  public addNoteToArchive(noteId: string): Observable<void> {
    return this.http.put<void>(`${API_URL}/add-to-archive`, noteId);
  }

}
