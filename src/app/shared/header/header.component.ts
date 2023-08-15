import { Component, AfterViewInit} from '@angular/core';
declare var Alpine: any;
import { initFlowbite } from 'flowbite/lib/esm/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
      Alpine.start();
  }

  expanded = false;

  toggleExpanded() {
    this.expanded = !this.expanded;
  }


}
