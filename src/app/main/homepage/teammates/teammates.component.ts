import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teammates',
  templateUrl: './teammates.component.html',
  styleUrl: './teammates.component.css'
})
export class TeammatesComponent {

  @Input() projectOwner: any;
  @Input() teammates: any[] | null = null;


}
