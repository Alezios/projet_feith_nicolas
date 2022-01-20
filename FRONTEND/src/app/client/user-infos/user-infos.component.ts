import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/user';
import { UserState } from 'src/app/userState';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.css']
})

export class UserInfosComponent implements OnInit {

  public userObs : Observable<User> | undefined;
  
  constructor(private clientService: ClientService, private store: Store) { }

  ngOnInit(): void {
    this.userObs = this.clientService.getCurrentUser();
  }
}