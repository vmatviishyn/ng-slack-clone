import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user: any;
  isMobilePwa: boolean;

  constructor(
    private authService: AuthService,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.isMobilePwa = this.deviceService.isMobilePwa();
  }

  logout(): void {
    this.authService.logout();
  }
}
