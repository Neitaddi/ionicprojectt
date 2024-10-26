import { Component, OnInit } from '@angular/core';
import { AutheticationService } from '../../authetication.service';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  LoginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public authService: AutheticationService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
          Validators.required,
        ],
      ],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    // console.log(this.email + this.password);
    if (this.LoginForm.valid) {
      //  await  loading.dismiss();
      const user = await this.authService
        .loginUser(this.LoginForm.value.email, this.LoginForm.value.password)
        .catch((err) => {
          this.presentToast(err);
          console.log(err);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.router.navigate(['/home']);
      }
    } else {
      return console.log('Please provide all the required values!');
    }
  }

  get errorControl() {
    return this.LoginForm.controls;
  }

  async presentToast(message: undefined) {
    console.log(message);

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
