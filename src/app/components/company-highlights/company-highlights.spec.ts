import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHighlights } from './company-highlights';

describe('CompanyHighlights', () => {
  let component: CompanyHighlights;
  let fixture: ComponentFixture<CompanyHighlights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyHighlights],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyHighlights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
