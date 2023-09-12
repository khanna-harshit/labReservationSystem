import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifytopologyComponent } from './modifytopology.component';

describe('ModifytopologyComponent', () => {
  let component: ModifytopologyComponent;
  let fixture: ComponentFixture<ModifytopologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifytopologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifytopologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
