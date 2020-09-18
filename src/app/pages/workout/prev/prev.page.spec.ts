import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrevPage } from './prev.page';

describe('PrevPage', () => {
  let component: PrevPage;
  let fixture: ComponentFixture<PrevPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrevPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
