import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  role: string = '';

constructor(private http: HttpClient, private router: Router) {}
login() {

  let apiUrl = '';

  if (this.role === 'clerk') {
    apiUrl = 'https://69a9403832e2d46caf45a991.mockapi.io/api/v1/authenticate';
  }

  if (this.role === 'admin') {
    apiUrl = 'https://69a9403832e2d46caf45a991.mockapi.io/api/v1/authenticate-admin';
  }

  this.http.get(apiUrl).subscribe((response:any) => {

    console.log("API Response:", response);

    const token = response[0]?.token;   // SAFE ACCESS

    if(!token){
      alert("Token not found in API response");
      return;
    }

    console.log("JWT Token:", token);

    const decoded = this.decodeToken(token);

    console.log("Decoded Token:", decoded);

    localStorage.setItem("token", token);

    alert("Login Successful");

    this.router.navigate(['/form']);

  });

}

 decodeToken(token: string) {

  if(!token){
    return null;
  }

  const payload = token.split('.')[1];

  const decodedPayload = atob(payload);

  return JSON.parse(decodedPayload);

}

}