import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DailyPlan } from '../model/dailyplan';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DailyPlanService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  public getDailyPlans(): Observable<DailyPlan[]> {
    return this.http.get<DailyPlan[]>(`${this.apiServerUrl}/dailyPlan/all`);
  }

  public getDailyPlansById(pId: string): Observable<DailyPlan> {
    return this.http.get<DailyPlan>(`${this.apiServerUrl}/dailyPlan/find/${pId}`);
  }

  public getDailyPlansFullyFiltered(name: string, glutenFree: boolean, lactoseFree: boolean, diabetesFriendly: boolean): Observable<DailyPlan[]> {
    return this.http.get<DailyPlan[]>(`${this.apiServerUrl}/dailyPlan/all/fullyFiltered/${name}/${glutenFree}/${lactoseFree}/${diabetesFriendly}`);
  }

  public getDailyPlansFullyFilteredByType(name: string, glutenFree: boolean, lactoseFree: boolean, diabetesFriendly: boolean, type: String): Observable<DailyPlan[]> {
    return this.http.get<DailyPlan[]>(`${this.apiServerUrl}/dailyPlan/all/fullyFilteredByType/${name}/${glutenFree}/${lactoseFree}/${diabetesFriendly}/${type}`);
  }

  public getDailyPlansByUserFullyFiltered(userId: Number, name: string, glutenFree: boolean, lactoseFree: boolean, diabetesFriendly: boolean): Observable<DailyPlan[]> {
    return this.http.get<DailyPlan[]>(`${this.apiServerUrl}/dailyPlan/all/byUserfullyFiltered/${userId}/${name}/${glutenFree}/${lactoseFree}/${diabetesFriendly}`);
  }

  public getDailyPlansByUserFullyFilteredByType(userId: Number, name: string, glutenFree: boolean, lactoseFree: boolean, diabetesFriendly: boolean, type: String): Observable<DailyPlan[]> {
    return this.http.get<DailyPlan[]>(`${this.apiServerUrl}/dailyPlan/all/byUserfullyFilteredByType/${userId}/${name}/${glutenFree}/${lactoseFree}/${diabetesFriendly}/${type}`);
  }

  public getDailyPlansFavouriteByUserFullyFiltered(userId: Number, name: string, glutenFree: boolean, lactoseFree: boolean, diabetesFriendly: boolean) {
    return this.http.get<DailyPlan[]>(`${this.apiServerUrl}/dailyPlan/all/favouriteByUserfullyFiltered/${userId}/${name}/${glutenFree}/${lactoseFree}/${diabetesFriendly}`);
  }

  public getDailyPlansFavouriteByUserFullyFilteredByType(userId: Number, name: string, glutenFree: boolean, lactoseFree: boolean, diabetesFriendly: boolean, type: string) {
    return this.http.get<DailyPlan[]>(`${this.apiServerUrl}/dailyPlan/all/favouriteByUserfullyFilteredByType/${userId}/${name}/${glutenFree}/${lactoseFree}/${diabetesFriendly}`);
  }

  public addDailyPlan(dailyPlan: DailyPlan, file: File): Observable<DailyPlan> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('dailyPlan', JSON.stringify(dailyPlan));
    return this.http.post<DailyPlan>(`${this.apiServerUrl}/dailyPlan/add`, formData);
  }

  public updateDailyPlanWithImage(dailyPlan: DailyPlan, file: File): Observable<DailyPlan> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('dailyPlan', JSON.stringify(dailyPlan));
    return this.http.put<DailyPlan>(`${this.apiServerUrl}/dailyPlan/updateWithImage`, formData);
  }

  public updateDailyPlan(dailyPlan: DailyPlan): Observable<DailyPlan> {
    return this.http.put<DailyPlan>(`${this.apiServerUrl}/dailyPlan/update`, dailyPlan);
  }

  public deleteDailyPlan(dailyPlanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/dailyPlan/delete/${dailyPlanId}`);
  }

  public deleteDailyPlansFromUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/dailyPlan/deleteFromUser/${userId}`);
  }

  public getImageData(dailyPlanId: number){
    return `${this.apiServerUrl}/dailyPlan/${dailyPlanId}/image`
    const apiUrl = `${this.apiServerUrl}/dailyPlan/${dailyPlanId}/image`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }
}
