import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  styles = {};
  showSplash = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.styles = { visibility: 'hidden', opacity: '0' };

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, 500);
    }, 3000);
  }

}
