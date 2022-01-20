import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddJWT, AddUsername } from 'src/app/userAction';
import { ClientService } from '../client.service';
import { Location } from '@angular/common';
import { UserState } from 'src/app/userState';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-form-group-login',
  templateUrl: './form-group-login.component.html',
  styleUrls: ['./form-group-login.component.css']
})
export class FormGroupLoginComponent implements OnInit {

  constructor(private clientService: ClientService, private fb: FormBuilder, private store: Store, private location: Location) { }

  hidePassword = true;

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  })

  onSubmit(): void {

    if (!this.loginForm.valid) {
      return;
    }

    this.clientService.isAuth = true;

    this.clientService.login( this.loginForm.value.username, this.loginForm.value.password ).subscribe(body => {

      if (body.access_token) {
        this.store.dispatch(new AddJWT(body.access_token));
        this.store.dispatch(new AddUsername(this.loginForm.value.username));
        this.location.back();
      } 
      else {
        this.loginForm.setErrors({
          apiError: true
        });
      }
    })
  }
}
