import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProyectsComponent } from './teacher-proyects.component';

describe('TeacherProyectsComponent', () => {
  let component: TeacherProyectsComponent;
  let fixture: ComponentFixture<TeacherProyectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProyectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
