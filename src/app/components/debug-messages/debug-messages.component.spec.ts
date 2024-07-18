import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugMessagesComponent } from './debug-messages.component';

describe('DebugMessagesComponent', () => {
  let component: DebugMessagesComponent;
  let fixture: ComponentFixture<DebugMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebugMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
