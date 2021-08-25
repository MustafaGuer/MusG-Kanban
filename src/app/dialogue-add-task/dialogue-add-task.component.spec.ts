import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueAddTaskComponent } from './dialogue-add-task.component';

describe('DialogueAddTaskComponent', () => {
  let component: DialogueAddTaskComponent;
  let fixture: ComponentFixture<DialogueAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueAddTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
