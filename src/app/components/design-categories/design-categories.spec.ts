import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCategories } from './design-categories';

describe('DesignCategories', () => {
  let component: DesignCategories;
  let fixture: ComponentFixture<DesignCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
