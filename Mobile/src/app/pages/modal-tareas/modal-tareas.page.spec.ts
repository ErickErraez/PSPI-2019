import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTareasPage } from './modal-tareas.page';

describe('ModalTareasPage', () => {
  let component: ModalTareasPage;
  let fixture: ComponentFixture<ModalTareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTareasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
