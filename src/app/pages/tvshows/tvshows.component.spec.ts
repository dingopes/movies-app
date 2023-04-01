import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVshowsComponent } from './tvshows.component';

describe('TVshowsComponent', () => {
  let component: TVshowsComponent;
  let fixture: ComponentFixture<TVshowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TVshowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TVshowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
