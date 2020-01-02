import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherProyectsPage } from './teacher-proyects.page';

describe('TeacherProyectsPage', () => {
  let component: TeacherProyectsPage;
  let fixture: ComponentFixture<TeacherProyectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProyectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherProyectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
