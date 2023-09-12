import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetopologyComponent } from './createtopology.component';

describe('CreatetopologyComponent', () => {
  let component: CreatetopologyComponent;
  let fixture: ComponentFixture<CreatetopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatetopologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
