import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements OnInit {
  form = new FormGroup({
    scheduleStartDtm: new FormControl(new Date(), Validators.required),
    scheduleEndDtm: new FormControl(new Date(), Validators.required)
  }, { validators: this.endDateAfterStartDate });

  ngOnInit() {
    // Listen for changes in the start and end date controls and update validity
    this.form.get('scheduleStartDtm')?.valueChanges.subscribe(() => {
      this.form.get('scheduleEndDtm')?.updateValueAndValidity();
    });

    this.form.get('scheduleEndDtm')?.valueChanges.subscribe(() => {
      this.form.get('scheduleStartDtm')?.updateValueAndValidity();
    });
  }

  // Validator to check if the end date is after the start date
  endDateAfterStartDate(group: AbstractControl): { [key: string]: boolean } | null {
    const start = group.get('scheduleStartDtm')?.value;
    const end = group.get('scheduleEndDtm')?.value;

    if (start && end && new Date(end) <= new Date(start)) {
      return { endDateInvalid: true };
    }
    return null;
  }

  getSelectedDateTime() {
    if (this.form.valid) {
      const start = this.form.get('scheduleStartDtm')?.value;
      const end = this.form.get('scheduleEndDtm')?.value;
      return { start, end };
    }
    return null;
  }
}
