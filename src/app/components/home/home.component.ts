import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<any>;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
  }
}
