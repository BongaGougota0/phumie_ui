import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhumieIndexComponent } from './phumie-index.component';

describe('PhumieIndexComponent', () => {
  let component: PhumieIndexComponent;
  let fixture: ComponentFixture<PhumieIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhumieIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhumieIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
