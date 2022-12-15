import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import { trips } from '../data/trips';

import { TripDataService } from '../../../services/trip-data.service';
import { Trip } from '../models/trip';
import { isDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [ TripDataService ]
})
export class TripListingComponent implements OnInit {
  // trips: Array<any> = trips;

  trips: Trip[];

  message: string;

  constructor(private tripDataService: TripDataService, private router: Router) {
  }

  private addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()
        .then(foundTrips => {
          this.message = foundTrips.length > 0 ? '' : 'No trips found';
          this.trips = foundTrips;
        });
  }

  private editTrip(trip: Trip): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", trip.code);
    localStorage.setItem("tripName", trip.name);
    localStorage.setItem("tripLength", trip.length);

    var dateAsString = '';

    /*
    if (trip.start === undefined) {
      dateAsString = 'undefined';
    } else if (trip.start === null) {
      dateAsString = 'null';
    } else if (isDate(trip.start)) {
      dateAsString = "" + (trip.start.getMonth() + 1) + "-" + trip.start.getDay() + "-" + trip.start.getFullYear();
    } else {
      dateAsString = "WTF?";
    }
    */

    dateAsString = "" + trip.start;

    localStorage.setItem("tripStart", dateAsString);
    localStorage.setItem("tripResort", trip.resort);
    localStorage.setItem("tripPerPerson", trip.perPerson);
    localStorage.setItem("tripImage", trip.image);
    localStorage.setItem("tripDescription", trip.description);
    this.router.navigate(['edit-trip']);
  }

  private deleteTrip(trip: Trip): void {
    localStorage.setItem("tripCode", trip.code);
    this.router.navigate(['delete-trip']);
  }
  
  ngOnInit():void {
    this.getTrips();
  }

}