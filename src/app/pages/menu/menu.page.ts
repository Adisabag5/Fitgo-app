import { Component, OnInit } from '@angular/core';
import { CurrUserService } from '../../services/curr-user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  public hours = ['08:00', '11:00', '14:00', '17:00', '20:00']

  public userMenu = {
    Sunday : {
            '08:00': 'aumlet', 
            '11:00': 'yogurt', 
            '14:00': 'chicken', 
            '17:00': 'fruit', 
            '20:00': 'salad'
            } ,
    Monday:{
      '08:00': 'aumlet', 
      '11:00': 'yogurt', 
      '14:00': 'chicken', 
      '17:00': 'fruit', 
      '20:00': 'salad'
      } ,
    Tuesday:{
      '08:00': 'aumlet', 
      '11:00': 'yogurt', 
      '14:00': 'chicken', 
      '17:00': 'fruit', 
      '20:00': 'salad'
      } ,
    Wednesday: {
      '08:00': 'aumlet', 
      '11:00': 'yogurt', 
      '14:00': 'chicken', 
      '17:00': 'fruit', 
      '20:00': 'salad'
      } ,
    Thursday:{
      '08:00': 'aumlet', 
      '11:00': 'yogurt', 
      '14:00': 'chicken', 
      '17:00': 'fruit', 
      '20:00': 'salad'
      } ,
    Friday: {
      '08:00': 'aumlet', 
      '11:00': 'yogurt', 
      '14:00': 'chicken', 
      '17:00': 'fruit', 
      '20:00': 'salad'
      } ,
    Saturday: {
      '08:00': 'aumlet', 
      '11:00': 'yogurt', 
      '14:00': 'chicken', 
      '17:00': 'fruit', 
      '20:00': 'salad'
      } ,
  };

  public menu;
  public today;

  constructor(
    private currUserService: CurrUserService
  ) { }

  ngOnInit() {
    this.userMenu = this.currUserService.getMenu();
    console.log(this.userMenu)
    this.getMenu()
  }

  getMenu(){
    var d = new Date();
    this.today = this.days[d.getDay()];
    this.userMenu = this.currUserService.getMenu();
    console.log(this.userMenu)
  }

}
