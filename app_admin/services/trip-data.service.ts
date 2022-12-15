import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../src/app/models/trip';
import { User } from '../src/app/models/user';
import { AuthResponse } from '../src/app/models/authresponse';
import { BROWSER_STORAGE } from '../src/app/storage';

@Injectable()
export class TripDataService {

	constructor(private http: Http,
    @Inject (BROWSER_STORAGE) private storage: Storage) {}

	private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;
  private deleteTripUrl = `${this.apiBaseUrl}/trips/delete/`;

  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get(this.tripUrl + tripCode)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }

	public getTrips(): Promise<Trip[]> {
		console.log('Inside TrupDataService#getTrips');
		return this.http
			.get(this.tripUrl)
			.toPromise()
			.then(response => response.json() as Trip[])
			.catch(this.handleError);
	}

  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    console.log(formData);
    return this.http
      .post(this.tripUrl, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put(this.tripUrl + formData.code, formData)
      .toPromise()
      .then(response => response.json() as Trip[])
      .catch(this.handleError);
  }

  public removeTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#removeTrip(tripCode)');
    return this.http
      .delete(this.deleteTripUrl + tripCode)
      .toPromise()
      .then(response => response.json() as Trip)
      .catch(this.handleError);
  }
 

	private handleError(error: any): Promise<any> {
		console.error('Something has gone wrong', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
    .post(url, user)
    .toPromise()
    .then(response => response.json() as AuthResponse)
    .catch(this.handleError);
  }
}
