import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // Clear previous alerts on submit
        this.alertService.clear();

        // Stop if the form is invalid and show an error message
        if (this.form.invalid) {
            this.toastr.error('Enter Credentials!', 'Error');
            return;
        }

        this.loading = true;

        // Call the login function in the account service
        this.accountService.login(this.f['username'].value, this.f['password'].value)
            .pipe(first()) // Take only the first emitted value
            .subscribe({
                next: (res) => {
                    // Show success toastr if login is successful
                    this.toastr.success('Login successful!', 'Success');

                    // You can handle redirection or further actions here after successful login
                    // For example: this.router.navigate(['/home']);
                },
                error: (error) => {
                    // Check if the error status is 401 for unauthorized access
                    if (error.status === 401) {
                        this.toastr.error('Unauthorized access. Please check your credentials.', 'Error');
                    } else {
                        // Handle other error responses
                        this.toastr.error('Unauthorized access. Please check your credentials.', 'Error');
                    }

                    // Stop loading when there's an error
                    this.loading = false;
                }
            });
    }


}