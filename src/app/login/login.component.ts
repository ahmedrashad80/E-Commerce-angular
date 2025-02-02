import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginFeilds = {
    emailInput: '',
    passwordInput: '',
  };
  handelLoginForm(form: any) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    console.log(form);
    console.log(form.value);
  }
}
