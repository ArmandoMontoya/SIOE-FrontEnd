import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProcesoElectoral } from 'src/app/model';
import { EleccionesPreview } from 'src/app/model/elecciones'

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private message = new BehaviorSubject<ProcesoElectoral>(new ProcesoElectoral);
  public customMessage = this.message.asObservable();

  private messagePreview = new BehaviorSubject<EleccionesPreview>(new EleccionesPreview);
  public customMessagePreview = this.messagePreview.asObservable();

  constructor() { }
  
  public changeMessage(msg: ProcesoElectoral): void {
    this.message.next(msg);
  }

  public changeMessagePreview(msg: EleccionesPreview): void {
    this.messagePreview.next(msg);
  }
}
