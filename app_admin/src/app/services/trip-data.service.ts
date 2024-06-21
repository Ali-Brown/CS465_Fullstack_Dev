import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../storage';
import { AuthResponse } from '../models/authresponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api';
  private tripUrl = `${this.apiBaseUrl}/trips`;


  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    //return this.http.get<Trip[]>(this.url + '/' + tripCode);
    return this.http.get<Trip[]>(`${this.tripUrl}/${tripCode}`);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    
    const headersOptions = new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
    });

    return this.http.post<Trip>(this.tripUrl, formData, {headers: headersOptions});
  }

  updateTrip(formData: Trip) : Observable<Trip> {

    const headersOptions = new HttpHeaders({
      'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
    });
    
    return this.http.put<Trip>(`${this.tripUrl}/${formData.code}`, formData, {headers: headersOptions});
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;

    return await lastValueFrom(
      this.http
        .post<AuthResponse>(url, user)
    ).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    //console.error('Error: ', error);
    return Promise.reject(error.message || error);
  }
}
