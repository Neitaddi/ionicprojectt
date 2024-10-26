import { Component, OnInit } from '@angular/core';
import { AutheticationService } from '../../authetication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup;
  //formBuilder is used to create and manage the form structure easily
  constructor(
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public authService: AutheticationService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // this.signUP()
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      // contact: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern('^[0-9]*$'),
      //     Validators.minLength(10),
      //     // Validators.min(10)
      //   ],
      // ],
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
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
          Validators.required,
        ],
      ],
    });
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.regForm.valid) {
      const user = await this.authService
        .registerUser(
          this.regForm.value.email,
          this.regForm.value.password,
          this.regForm.value.fullname
        )
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
  //get error
  get errorControl() {
    return this.regForm.controls;
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
