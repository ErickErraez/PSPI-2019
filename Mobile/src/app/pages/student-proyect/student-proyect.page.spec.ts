import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentProyectPage } from './student-proyect.page';

describe('StudentProyectPage', () => {
  let component: StudentProyectPage;
  let fixture: ComponentFixture<StudentProyectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProyectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProyectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
