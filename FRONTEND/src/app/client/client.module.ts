import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupRegistrationComponent } from './form-group-registration/form-group-registration.component';
import { RouterModule, Routes } from '@angular/router';
import { RecapFormComponent } from './recap-form/recap-form.component';
import { PhonePipe } from './phone-pipe';
import { MatDialog, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormGroupLoginComponent } from './form-group-login/form-group-login.component';
import { UserInfosComponent } from './user-infos/user-infos.component';
import { UserState } from '../userState';
import { NgxsModule } from '@ngxs/store';

const childRoutes: Routes = [
  {
    path: 'signup',
    component: FormGroupRegistrationComponent
  },
  {
    path: 'login',
    component: FormGroupLoginComponent
  },
  {
    path: 'infos',
    component: UserInfosComponent
  }
];

@NgModule({
  declarations: [
    FormGroupRegistrationComponent,
    RecapFormComponent,
    PhonePipe,
    FormGroupLoginComponent,
    UserInfosComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatSidenavModule,
    MatCardModule,
    MatRadioModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forChild(childRoutes),
    NgxsModule.forFeature([UserState])
  ],
  providers: [
    { 
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}
    },
],
})
export class ClientModule { }
