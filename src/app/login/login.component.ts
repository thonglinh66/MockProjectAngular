import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   error = '';
  constructor(private router:Router, private authenticationService: AuthService, private route: ActivatedRoute,) { }
  
  ngOnInit() {
  }
  rand() : string {
    return Math.random().toString(36).substr(2); // remove `0.`
  }

  
  loginCheck(e){
    e.preventDefault();
    var username = e.target.elements[0].value;
  	var password = e.target.elements[1].value;
    // console.log(username + " == username" + password +" === 123");
    this.authenticationService.login(username, password)
    .pipe(first())
    .subscribe({
        next: () => {
            // get return url from query parameters or default to home page
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
            this.router.navigateByUrl(returnUrl);
        },
        error: error => {
            this.error = error;
        }
    });
  }

}
