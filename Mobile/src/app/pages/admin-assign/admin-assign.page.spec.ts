import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminAssignPage } from './admin-assign.page';

describe('AdminAssignPage', () => {
  let component: AdminAssignPage;
  let fixture: ComponentFixture<AdminAssignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAssignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
