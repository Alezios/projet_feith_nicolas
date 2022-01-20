import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../password-matching-error-matcher";
import {MatDialog} from "@angular/material/dialog";
import {RecapFormComponent} from "../recap-form/recap-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import { User } from '../../user';
import { ClientService } from '../client.service';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-form-group-registration',
    templateUrl: './form-group-registration.component.html',
    styleUrls: ['./form-group-registration.component.css']
})
export class FormGroupRegistrationComponent implements OnInit {

    constructor(private clientService: ClientService, private fb: FormBuilder, public dialog: MatDialog, private sb: MatSnackBar) {}

    checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password')?.value;
        let confirmPass = group.get('confirmPassword')?.value
        return pass === confirmPass ? null : {notSame: true}
    }

    phoneNumber = "388080808"
    phonePrefix = "+33"
    hidePassword = true
    hideConfirm = true

    matcher = new MyErrorStateMatcher();

    countries = [
        {name: 'France', prefix: '+33'},
        {name: 'United Kingdom', prefix: '+44'},
        {name: 'Belgium', prefix: '+32'},
        {name: 'Germany', prefix: '+49'},
        {name: 'Switzerland', prefix: '+41'},
        {name: 'Italy', prefix: '+39'},
        {name: 'Spain', prefix: '+34'},
        {name: 'United States', prefix: '+1'},
        {name: 'Canada', prefix: '+1'},

    ]

    registrationForm = this.fb.group({
        firstname: [null, Validators.required],
        lastName: [null, Validators.required],
        address: [null, Validators.required],
        city: [null, Validators.required],
        cp: [null, Validators.compose(
            [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*'),]
        )],
        country: [null, Validators.required],
        telephone: [null, Validators.compose([
            Validators.required, Validators.pattern('[0-9]{9}')
        ])],
        email: [null, Validators.compose([
            Validators.required, Validators.email
        ])],
        gender: [null, Validators.required],
        username: [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]*")])],
        password: [null, Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
        confirmPassword: [null, Validators.required],
    }, {validators: this.checkPasswords})

    openDialog() {
        let country: any =this.countries.find(element => element.prefix == this.registrationForm.controls['country'].value)?.name
        console.log(country)
        const DialogRef = this.dialog.open(RecapFormComponent, {
            data: {
                firstname: this.registrationForm.controls['firstname'].value,
                lastName: this.registrationForm.controls['lastName'].value,
                address: this.registrationForm.controls['address'].value,
                city: this.registrationForm.controls['city'].value,
                cp: this.registrationForm.controls['cp'].value,
                country: this.countries.find(element => element.prefix == this.registrationForm.controls['country'].value)?.name,
                prefix: this.registrationForm.controls['country'].value,
                telephone: this.registrationForm.controls['telephone'].value,
                email: this.registrationForm.controls['email'].value,
                gender: this.registrationForm.controls['gender'].value,
                username: this.registrationForm.controls['username'].value,
            }
        })
        DialogRef.afterClosed().subscribe(result => {
            if(result == true)
            {

                this.sb.open("Registered", "Ok")
            }
        })
    }

    ngOnInit(): void {
    }

    onSubmit(): void{

        if (!this.registrationForm.valid) {
          return;
        }
    
        const newUser : User = new User(
          this.registrationForm.value.firstname,
          this.registrationForm.value.lastName,
          this.registrationForm.value.address,
          this.registrationForm.value.city,
          this.registrationForm.value.cp,
          this.countries.find(element => element.prefix == this.registrationForm.controls['country'].value)!.name,
          this.registrationForm.value.country,
          this.registrationForm.value.tel,
          this.registrationForm.value.email,
          this.registrationForm.value.gender,
          this.registrationForm.value.username,
          this.registrationForm.value.password
        )

        this.clientService.create(newUser).subscribe(user => {
            if( user ){
                console.log(user);
                this.openDialog();
            }
            else{
                console.log("raté");
                /*
                this.registrationForm.setErrors({
                  duplicateLogin: true
                });
                */
              }
        });
      }


}
