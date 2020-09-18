import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AuthService } from './pages/auth/auth.service';
import { FirebaseConfig } from './firebase';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
  ) {
   
    this.initializeApp();
  }


  initializeApp() {
    firebase.initializeApp(FirebaseConfig);
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    
   /*
    this.storage.get('storage_xxx').then( (res) => {
      if(res == null) 
        {this.navCtrl.navigateRoot('/login');}
      else 
        {this.navCtrl.navigateRoot('/home');}
      
    });
    */
  }
   onLogout(){
     this.authService.logout();
     this.router.navigateByUrl('/auth');
   }

}
