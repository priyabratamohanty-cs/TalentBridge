import { Component, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DateformatPipe } from './pipes/dateformat.pipe';
import { EventEmitter } from 'events';
import { MatDatepickerInputEvent } from '@angular/material';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  batchDetails: FormGroup;

  minStartDate;
  minEndDate;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  agePattern = "^((\\+91-?)|0)?[0-9]{2}$";
  disableAddbutton = false;

  constructor(private fb: FormBuilder, ) {
    this.batchDetails = fb.group({
      batchName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(21)]],
      startBatch: ['', Validators.required],
      endBatch: ['', Validators.required],
      educationDetails: fb.array([
        this.fb.group({
          candidateName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(21)]],
          emailId: ["", [Validators.email]],
          mobileNo: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
          age: ['', [Validators.required, Validators.min(18), Validators.max(56)]]
        })
      ])
    })
    this.minStartDate = new Date();
    this.minEndDate = this.batchDetails.value.startBatch
  }

  setEndBatchMinDate() {
    this.minEndDate = this.batchDetails.value.startBatch
  }

  get getEducationDetails() {
    return this.batchDetails.get("educationDetails") as FormArray;
  }

  addNewEducationDetails() {
    console.log("add new item details");
    this.getEducationDetails.push(
      this.fb.group({
        candidateName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(21)]],
        emailId: ["", [Validators.email]],
        mobileNo: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        age: ['', [Validators.required, Validators.min(18), Validators.max(56)]]
      })
    );
    console.log(this.getEducationDetails.controls[0].get('candidateName').valid);
  }

  resetForm() {
    this.batchDetails.reset();
  }

}