import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isPWA = false;

  constructor(
    private deviceService: DeviceService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isPWA = this.deviceService.isPWA();
  }

  logout(): void {
    this.authService.logout();
  }
}
