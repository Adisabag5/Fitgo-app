import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule} from '@angular/common/http';

import { AccessProviders} from './providers/access-providers';
import { HTTP } from '@ionic-native/http/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from '../environments/environment.prod';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            IonicStorageModule.forRoot(),
            HttpClientModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFireAuthModule,
            AngularFirestoreModule,
            AngularFireDatabaseModule,
            
            
          ],
  providers: [
    StatusBar,
    SplashScreen,
    AccessProviders,
    AngularFirestoreModule,
    Geolocation,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
