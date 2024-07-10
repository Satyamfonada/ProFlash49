import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  newPassword: string;
  confirmNewPassword: string;
  resetToken: string;
  passwordUpdated:any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Get the password reset token from the query params
    this.resetToken = this.route.snapshot.queryParams['resetToken'];
  }

  onSubmit() {
    // Send a POST request to the server to update the user's password
    const passwordResetData = {
      newPassword: this.newPassword,
      resetToken: this.resetToken,
    };
    this.http.post('/api/reset-password', passwordResetData).subscribe(
      (response) => {
        // Display a success message to the user
        console.log('Password updated successfully');
      },
      (error) => {
        // Display an error message to the user
        console.log('Error updating password', error);
      }
    );
  }
}
