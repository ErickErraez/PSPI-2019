import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminControlPage } from './admin-control.page';

describe('AdminControlPage', () => {
  let component: AdminControlPage;
  let fixture: ComponentFixture<AdminControlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminControlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminControlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
