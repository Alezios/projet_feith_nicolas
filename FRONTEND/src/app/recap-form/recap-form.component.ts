import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import { User } from '../user';

@Component({
  selector: 'app-recap-form',
  templateUrl: './recap-form.component.html',
  styleUrls: ['./recap-form.component.css']
})
export class RecapFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

}
