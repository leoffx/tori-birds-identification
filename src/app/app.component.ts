import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TfService } from './services/model.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tori';

  constructor(
    public router: Router,
    public tfService: TfService
  ) {
    tfService.init();
  }
}
