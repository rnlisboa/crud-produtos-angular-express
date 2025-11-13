import { Component, Input, ViewChild } from '@angular/core';
import PedidoItemEntity from '../../../interfaces/domain/pedido-item.entity';
import { PoModalComponent, PoModalModule } from '@po-ui/ng-components';
import { PedidoItemResponse } from '../../../interfaces/response/pedido-response';

@Component({
  selector: 'app-generic-modal',
  imports: [PoModalModule],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.less',
})
export class GenericModalComponent {
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  elementos!: PedidoItemResponse[];

  openModal(elementos: PedidoItemResponse[]) {
    this.elementos = elementos;
    this.poModal.open();
  }
}
