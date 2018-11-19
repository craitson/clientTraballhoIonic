import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfessorPage } from './editar-professor.page';

describe('EditarProfessorPage', () => {
  let component: EditarProfessorPage;
  let fixture: ComponentFixture<EditarProfessorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProfessorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProfessorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
