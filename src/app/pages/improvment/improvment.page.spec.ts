import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImprovmentPage } from './improvment.page';

describe('ImprovmentPage', () => {
  let component: ImprovmentPage;
  let fixture: ComponentFixture<ImprovmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprovmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImprovmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
