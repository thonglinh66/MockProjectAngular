import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string ;
  constructor(private router:Router) { }
  
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
    if(username === "username" && password === "123"){
      localStorage.setItem('token', this.rand() + this.rand());
      this.error = "";
      this.router.navigate(['home']);
    }else{
      this.error = "Username or Password dont correct!!";
    }
  }

}
