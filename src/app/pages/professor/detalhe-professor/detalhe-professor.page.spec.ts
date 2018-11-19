import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheProfessorPage } from './detalhe-professor.page';

describe('DetalheProfessorPage', () => {
  let component: DetalheProfessorPage;
  let fixture: ComponentFixture<DetalheProfessorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheProfessorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheProfessorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
