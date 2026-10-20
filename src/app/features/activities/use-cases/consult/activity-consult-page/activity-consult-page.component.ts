import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityFormComponent } from '../../../components/activity-form/activity-form.component';
import { ActivityService } from '../../../service/activity.service';
import { Activity } from '../../../models/activity.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-activity-consult-page',
  standalone: true,
  imports: [ActivityFormComponent],
  providers: [MessageService],
  templateUrl: './activity-consult-page.component.html',
})
export class ActivityConsultPageComponent implements OnInit {
  private service = inject(ActivityService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activity = signal<Activity | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id).subscribe(a => this.activity.set(a));
  }

  back() {
    this.router.navigate(['/activities']);
  }
}