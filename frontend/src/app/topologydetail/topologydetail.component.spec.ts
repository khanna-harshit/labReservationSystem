import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologydetailComponent } from './topologydetail.component';

describe('TopologydetailComponent', () => {
  let component: TopologydetailComponent;
  let fixture: ComponentFixture<TopologydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopologydetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopologydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
