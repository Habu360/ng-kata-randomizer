import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KataListComponent } from './kata-list.component';

describe('KataListComponent', () => {
  let component: KataListComponent;
  let fixture: ComponentFixture<KataListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KataListComponent]
    });
    fixture = TestBed.createComponent(KataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
