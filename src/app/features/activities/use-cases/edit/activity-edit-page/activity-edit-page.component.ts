import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityFormComponent } from '../../../components/activity-form/activity-form.component';
import { ActivityService } from '../../../service/activity.service';
import { Activity } from '../../../models/activity.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activity-edit-page',
  standalone: true,
  imports: [ActivityFormComponent],
  templateUrl: './activity-edit-page.component.html',
})
export class ActivityEditPageComponent implements OnInit {
  private service = inject(ActivityService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
   private messages = inject(MessageService);

  private id = Number(this.route.snapshot.paramMap.get('id'));
  activity = signal<Activity | null>(null);

  ngOnInit() {
    this.service.getById(this.id).subscribe(a => this.activity.set(a));
  }

  save(a: Activity) {
    this.service.update(this.id, { ...a, id: this.id }).subscribe({
      next: () => {
        this.messages.add({ severity: 'success', summary: 'Succès', detail: 'Activité modifiée.' });
        this.router.navigate(['/activities']);
      },
      error: () => {
        this.messages.add({ severity: 'error', summary: 'Erreur', detail: 'Modification impossible.' });
      },
    });
  }

  back() {
    this.router.navigate(['/activities']);
  }
}