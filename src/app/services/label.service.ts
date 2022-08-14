import {Injectable} from "@angular/core";
import {LabelDTO} from "../dto/label.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {CreateEditLabelRequest} from "../request/create-edit-label.request";

const API_URL = `${environment.apiUrl}/label`;

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  public newLabel: Subject<LabelDTO> = new Subject<LabelDTO>();
  public deleteLabel: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  /**
   * Gets labels for user
   */
  public getLabelsForUser(): Observable<LabelDTO[]> {
    return this.http.get<LabelDTO[]>(`${API_URL}`);
  }

  /**
   * Creates label for user in system
   *
   * @param createLabelRequest contains name of label
   */
  public create(createLabelRequest: CreateEditLabelRequest): Observable<void> {
    return this.http.post<void>(`${API_URL}/create`, createLabelRequest);
  }

  /**
   * Edits already created label name
   *
   * @param editLabelRequest contains label new name
   */
  public edit(editLabelRequest: CreateEditLabelRequest): Observable<void> {
    return this.http.put<void>(`${API_URL}/edit`, editLabelRequest);
  }

  /**
   * Deletes label by name for current user
   *
   * @param name of label
   */
  public delete(name: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/delete/${name}`);
  }
}
