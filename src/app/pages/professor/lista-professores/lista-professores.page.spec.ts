import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProfessoresPage } from './lista-professores.page';

describe('ListaProfessoresPage', () => {
  let component: ListaProfessoresPage;
  let fixture: ComponentFixture<ListaProfessoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProfessoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProfessoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
