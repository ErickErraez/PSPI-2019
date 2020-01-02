import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentFormPage } from './student-form.page';

describe('StudentFormPage', () => {
  let component: StudentFormPage;
  let fixture: ComponentFixture<StudentFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
