import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherNotesPage } from './teacher-notes.page';

describe('TeacherNotesPage', () => {
  let component: TeacherNotesPage;
  let fixture: ComponentFixture<TeacherNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherNotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
