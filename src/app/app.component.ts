import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TfService } from './services/model.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tori';

  constructor(
    public router: Router,
    public shared: SharedService,
    public tfService: TfService
  ) {
    tfService.init();
  }
}
