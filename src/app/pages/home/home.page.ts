import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { HttpClient } from '@angular/common/http';
import { tap, map, filter, retry, catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './userData.model';
import { CurrUserService } from '../../services/curr-user.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'menu-example',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class HomePage {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  userId1: any;
  userId2: any ;

  userData: any;
  
  userMarker: any;
  isPartners = false;
  partnersList = [];
  
  your_name: string;
  lastWorkout: string = 'None';
  lastWorkoutDate: string = 'None';
  nextWorkout: string = 'None';
  weight;
  trainigProg;
  newWeight;
  newLevel;

  isNew;
  show=false;

  isShowData = false;



constructor(
  private menu: MenuController,
  private http: HttpClient,
  public currUserService: CurrUserService,
  private geolocation: Geolocation,
  private nativeGeocoder: NativeGeocoder,
  private crud: CrudService,
  private router: Router,
  
  ) {  }

  
  ngOnInit() {

    if (this.router.getCurrentNavigation().extras){
      this.userId1 = this.router.getCurrentNavigation().extras.state.userId;
      console.log(this.userId1);
      this.fetchUsers(this.userId1).subscribe();
    }
    
    
    this.userData = this.currUserService.getUserData();
    this.loadMap();
    this.currUserService.fetchUsers(this.userId1).subscribe();
    this.findPartners()
    
    
  }

  ionViewWillEnter() {
    this.currUserService.fetchUsers(this.userId1).subscribe();
    
}

  findPartners(){
    this.partnersList = this.currUserService.partners;
  }

  showPartners(){
    this.isPartners = true;
  }

  updateWeight(){
    this.userData.weight = this.newWeight;
    this.currUserService.updateUserData(this.userData).subscribe();
  }

  newProg(){
    this.userData.weight = this.newWeight;
    this.userData.level = this.newLevel;
    this.currUserService.updateUserData(this.userData).subscribe();
    this.currUserService.getProgram();
  }

  fetchUsers(userId1){
    return this.http.get(`https://fitgodb.firebaseio.com/users/${userId1}.json`)
                .pipe(map(resData => {
                  console.log(resData);
                  
                  this.userId2 = Object.keys(resData)[0];
                  console.log(resData[this.userId2]);
                  this.userData = resData[this.userId2];
                  this.your_name = this.userData['your_name'];
                  
                }
                ));
  }

  getUserData(){
    console.log(this.userId2);
    console.log(this.userData);
    return this.userData;
    
  }

  showData(){
    this.lastWorkout= this.userData['lastWorkoutName'];
    this.lastWorkoutDate= this.userData['lastWorkoutDate'];
    this.nextWorkout= this.userData['nextWorkoutName'];
    this.weight= this.userData['weight'];
    this.trainigProg= this.userData['trainProg'];
    this.isShowData = true;
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  /* Google map*/

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      let position = {
        lat: resp.coords.latitude,
        lon: resp.coords.longitude 
      }
      let icon = {
        url: 'assets/icon/user_marker.jpg',
        scaledSize: new google.maps.Size(50,50)
      }
  
      let userMarker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'My location',
        icon: icon
      });

      
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.userMarker = userMarker;

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.addMarker(position);

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadPartnerMap(lat:Number,lon:Number){
    let position = {
      lat: Number(lat),
      lon: Number(lon )
    }

    let latLng = new google.maps.LatLng(lat, lon);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.addListener('dragend', () => {

      this.latitude = this.map.center.lat();
      this.longitude = this.map.center.lng();

      this.addMarker(position);

      this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }

  addMarker(position) {
    let icon = {
      url: 'assets/icon/user_marker.jpg',
      scaledSize: new google.maps.Size(50,50)
    }

    let userMarker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: 'My location',
      icon: icon
    });
    console.log(userMarker)
    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(userMarker, 'click', () => {
      infoWindow.open(this.map, userMarker);
    });
  }
  
}

