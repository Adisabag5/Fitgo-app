
export class Workout {
    constructor(
        public id: string,
        public name: string,
        public duration: string,
        public date: string,
    ){}
}

/*
<ion-grid>
    <ion-row>
      <ion-col>
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ loadedWorkouts[0].date }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{loadedWorkouts[0].name}}</p>
            <p>{{loadedWorkouts[0].duration}}</p>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ loadedWorkouts[0].date }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{loadedWorkouts[0].name}}</p>
            <p>{{loadedWorkouts[0].duration}}</p>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ loadedWorkouts[0].date }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{loadedWorkouts[0].name}}</p>
            <p>{{loadedWorkouts[0].duration}}</p>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-button routerLink = "/prev">
          Previous Workouts
        </ion-button> 
      </ion-col>
      <ion-col>
        <ion-button routerLink = "/next">
          Next Workouts
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
*/