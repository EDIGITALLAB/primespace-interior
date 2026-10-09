import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExploreDesignIdeas } from "./explore-design-ideas";

describe("ExploreDesignIdeas", () => {
  let component: ExploreDesignIdeas;
  let fixture: ComponentFixture<ExploreDesignIdeas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreDesignIdeas],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreDesignIdeas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
