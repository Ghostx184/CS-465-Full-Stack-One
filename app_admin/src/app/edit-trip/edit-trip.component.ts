import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from
  "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../../../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService) { }

  ngOnInit() {
    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    let tripName = localStorage.getItem("tripName");
    let tripLength = localStorage.getItem("tripLength");
    let tripStart = localStorage.getItem("tripStart");
    let tripResort = localStorage.getItem("tripResort");
    let tripPerPerson = localStorage.getItem("tripPerPerson");
    let tripImage = localStorage.getItem("tripImage");
    let tripDescription = localStorage.getItem("tripDescription");

    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent#onInit found tripCode ' + tripCode);

    // initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: [tripName, Validators.required],
      length: [tripLength, Validators.required],
      start: [tripStart, Validators.required],
      resort: [tripResort, Validators.required],
      perPerson: [tripPerPerson, Validators.required],
      image: [tripImage, Validators.required],
      description: [tripDescription, Validators.required],
    })

    console.log('EditTripComponent#onInit calling TripDataService#getTrip(\'' + tripCode + '\')');

    this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        // Don't use editForm.setValue() as it will throw console error
        this.editForm.patchValue(data);
      })
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['']);
        });
    }
  }
}
