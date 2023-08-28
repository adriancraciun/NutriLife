import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/id/${userId}`);
  }

  public addUser(user: User, file: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const favouriteDailyPlansArray = Array.from(user.favouriteDailyPlanIds);
    user.favouriteDailyPlanIds = favouriteDailyPlansArray;

    formData.append('user', JSON.stringify(user));
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, formData);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public updateUserWithImage(user: User, file: File): Observable<User> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('user', JSON.stringify(user));
    return this.http.put<User>(`${this.apiServerUrl}/user/updateWithImage`, formData);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  // public getImageData(userId: number): Observable<string> {
  //   const apiUrl = `${this.apiServerUrl}/user/${userId}/image`;
  //   return this.http.get(apiUrl, { responseType: 'text' });
  // }

  public getImageData(userId: number): Observable<Blob> {
    const apiUrl = `${this.apiServerUrl}/user/${userId}/image`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }

  public getImageDataDirectly(desiredUserId: number): import("@angular/platform-browser").SafeUrl | undefined {
    return `${this.apiServerUrl}/user/${desiredUserId}/image`
  }
  
}
