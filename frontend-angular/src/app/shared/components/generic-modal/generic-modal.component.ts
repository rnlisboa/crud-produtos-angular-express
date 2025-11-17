import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import PedidoItemEntity from '../../../interfaces/domain/pedido-item.entity';
import {
  PoButtonModule,
  PoFieldModule,
  PoInfoModule,
  PoListViewModule,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
} from '@po-ui/ng-components';
import { PedidoItemResponse } from '../../../interfaces/response/pedido-response';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { PedidoService } from '../../../services/pedidos/pedido.service';
import { FormsModule } from '@angular/forms';
import { StatusPedido } from '../../../enum/status-pedido.enum';

@Component({
  selector: 'app-generic-modal',
  imports: [
    PoModalModule,
    PoListViewModule,
    PoInfoModule,
    CurrencyPipe,
    PoButtonModule,
    PoFieldModule,
    FormsModule,
  ],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.less',
})
export class GenericModalComponent {
  poNotification = inject(PoNotificationService);
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  elementos!: PedidoItemResponse[];

  @Output() itensAtualizados = new EventEmitter<void>();

  editingItemId: string | null = null;
  novaQuantidade: number | null = null;
  permiteOperacao: boolean = false;

  constructor(private pedidoService: PedidoService) {}

  iniciarEdicao(item: PedidoItemResponse) {
    if (this.permiteOperacao) {
      this.editingItemId = item.id;
      this.novaQuantidade = item.quantidade;
    }
  }

  salvarQuantidade(item: PedidoItemResponse) {
    if (this.novaQuantidade == null) return;

    this.pedidoService.updateItem(item.id, this.novaQuantidade).subscribe({
      next: (res) => {
        this.elementos = this.elementos.map((p) =>
          p.id === item.id ? { ...p, quantidade: this.novaQuantidade! } : p
        );

        this.poNotification.success(res.message);
        this.editingItemId = null;
        this.novaQuantidade = null;

        this.emitirAtualizacao();
      },
    });
  }

  deletarItemPedido(id: string) {
    this.pedidoService.deleteItem(id).subscribe({
      next: (res) => {
        this.poNotification.success(res.message);
        this.elementos = this.elementos.filter((item) => item.id !== id);
        this.emitirAtualizacao();
      },
      error: (res) => {
        this.poNotification.error(res);
      },
    });
  }

  openModal(elementos: PedidoItemResponse[], status?: StatusPedido) {
    this.permiteOperacao = status === StatusPedido.PROCESSANDO;
    this.elementos = elementos;
    this.poModal.open();
  }

  emitirAtualizacao() {
    this.itensAtualizados.emit();
  }
}
