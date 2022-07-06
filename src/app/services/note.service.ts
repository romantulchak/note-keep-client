import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {NoteDTO} from "../dto/note.dto";

const API_URL = `${environment.apiUrl}/note`;

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) {
  }


  /**
   * Send request to server to get user notes
   */
  public getNotes(page: number = 0): Observable<NoteDTO[]> {
    const params = new HttpParams().append('page', page);
    return this.http.get<NoteDTO[]>(API_URL, {params: params});
  }
}
