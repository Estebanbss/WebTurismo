import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { PrestadoresService } from 'src/app/core/services/prestadores.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {

  constructor( private MatProgressBarModule: MatProgressBarModule, private modalService: ModalServiceService,private prestadoresService: PrestadoresService,) { }


  private modalDataSubscription!: Subscription;

  inputValue: string = '';
  Value: string = '';


  closemodal() {
    this.modalService.setWarning(false);//cierra el modal
    alert("ya 👍")
   }

 ngOnInit(): void {
  this.modalDataSubscription = this.modalService.currentValue.subscribe(value => this.Value = value);
 }

 ngOnDestroy() {
  if (this.modalDataSubscription) {
    this.modalDataSubscription.unsubscribe();
  }
}

  borrartodo(){
    this.prestadoresService.borrarTodosLosDocumentos(this.Value);
    this.closemodal()
  }
}
