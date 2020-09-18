import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Exercise1Page } from './exercise1.page';

describe('Exercise1Page', () => {
  let component: Exercise1Page;
  let fixture: ComponentFixture<Exercise1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Exercise1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Exercise1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
