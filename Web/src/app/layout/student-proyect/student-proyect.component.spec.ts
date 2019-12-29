import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProyectComponent } from './student-proyect.component';

describe('StudentProyectComponent', () => {
  let component: StudentProyectComponent;
  let fixture: ComponentFixture<StudentProyectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProyectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
