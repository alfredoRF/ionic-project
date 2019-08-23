import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogIn = true;

  constructor(private loginService: AuthService,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onLogin() {
    this.isLoading = true;
    this.loginService.login();
    this.loadingCtrl.create({keyboardClose: true, message: 'logging in...'})
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const pass = form.value.password;
    console.log(email, pass);

    if (this.isLogIn) {
      // Send a request to login servers
    } else {
      // Send a request to login servers
    }
  }

  onSwitchAuthMode() {
    this.isLogIn = !this.isLogIn;
  }

}
