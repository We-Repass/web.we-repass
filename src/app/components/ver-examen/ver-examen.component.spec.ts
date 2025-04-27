import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerExamenComponent } from './ver-examen.component';

describe('VerExamenComponent', () => {
  let component: VerExamenComponent;
  let fixture: ComponentFixture<VerExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerExamenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
