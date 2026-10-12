import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivitySearchCriteria } from '../../../models/activity-search-criteria.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activity-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, PanelModule, ButtonModule, InputTextModule, InputNumberModule],
  providers: [MessageService],
  templateUrl: './activity-search-form.component.html',
})
export class ActivitySearchFormComponent {
  private fb = inject(FormBuilder);

  search = output<ActivitySearchCriteria>();

  form = this.fb.group({
    id: [null as number | null],
    name: [''],
    description: [''],
    durationMin: [null as number | null],
    durationMax: [null as number | null],
  });

  submit() {
    this.search.emit(this.form.getRawValue());
  }

  reset() {
    this.form.reset();
    this.submit();
  }
}