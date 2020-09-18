import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
   id: string = "";
   name: string = "";
   duration: string = "";
   date: string = new Date().toDateString();
    

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit() {
  }

  
/*
  addWorkout(){
    let workout = {
      id: this.id,
      name: this.name,
      duration: this.duration,
      date: this.date
    }
    return this.crudService.createDatabse(workout);

  }
*/
}
