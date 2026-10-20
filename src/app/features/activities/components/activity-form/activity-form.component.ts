import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Activity } from '../../models/activity.model';
import {  effect,  input } from '@angular/core';
export type FormMode = 'create' | 'edit' | 'view';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputNumberModule],
  templateUrl: './activity-form.component.html',
})
export class ActivityFormComponent {

   mode = input<FormMode>('create');              
  activity = input<Activity | null>(null); 
  private fb = inject(FormBuilder);

  submitted = output<Activity>();
  cancelled = output<void>();

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    durationMinutes: [null as number | null, [Validators.required, Validators.min(1)]],
  });

    constructor() {                                // ← ajouter
    effect(() => {
      const a = this.activity();
      if (a) {
        this.form.patchValue(a);
      }
      if (this.mode() === 'view') {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue() as Activity);
  }
}