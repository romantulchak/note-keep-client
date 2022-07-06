import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {JwtDTO} from "../dto/jwt.dto";
import {SignInRequest} from "../requests/auth/sign-in.request";
import {SignUpRequest} from "../requests/auth/sign-up.request";

const API_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signUp(signUpRequest: SignUpRequest): Observable<void> {
    return this.http.post<void>(`${API_URL}/sign-up`, signUpRequest);
  }

  public signIn(signInRequest: SignInRequest): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(`${API_URL}/sign-in`, signInRequest);
  }

  /**
   * Save token after successful sign in
   * @param token to be saved
   */
  public saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Get user token from local storage
   */
  public getToken(): string | null {
    const token = localStorage.getItem('token');
    return token !== null ? token : null;
  }
}
