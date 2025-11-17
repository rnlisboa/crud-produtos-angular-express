import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../services/pedidos/pedido.service';
import { PedidoResponse } from '../../interfaces/response/pedido-response';
import {
  PoButtonModule,
  PoFieldModule,
  PoNotificationService,
  PoTabsModule,
  PoWidgetModule,
} from '@po-ui/ng-components';
import { StatusPedido } from '../../enum/status-pedido.enum';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import PedidoItemEntity from '../../interfaces/domain/pedido-item.entity';
import { GenericModalComponent } from '../../shared/components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-pedidos',
  imports: [
    PoButtonModule,
    PoFieldModule,
    FormsModule,
    PoTabsModule,
    PoWidgetModule,
    DatePipe,
    DecimalPipe,
    TitleCasePipe,
    GenericModalComponent,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.less',
})
export class PedidosComponent implements OnInit {
  poNotification = inject(PoNotificationService);
  pedidosConcluidos!: { pedido: PedidoResponse }[];
  pedidosProcessando!: { pedido: PedidoResponse }[];
  pedidosCancelados!: { pedido: PedidoResponse }[];
  pedidoEnviado!: { pedido: PedidoResponse }[];
  selectedStatus: StatusPedido = StatusPedido.PROCESSANDO;

  @ViewChild(GenericModalComponent, { static: false })
  genericModal!: GenericModalComponent;

  itens: PedidoItemEntity[] = [];

  statusOptions = [
    { label: 'Processando', value: StatusPedido.PROCESSANDO },
    { label: 'Concluído', value: StatusPedido.CONCLUIDO },
  ];

  deveMostrarBotaoConcluir: boolean = true;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.findAllPedidos();
  }

  findAllPedidos() {
    this.pedidoService.findAll().subscribe({
      next: (res) => {
        this.pedidosConcluidos = res.filter(
          (p) => p.pedido.pedidoDetalhe.status === StatusPedido.CONCLUIDO
        );
        this.pedidosProcessando = res.filter(
          (p) => p.pedido.pedidoDetalhe.status === StatusPedido.PROCESSANDO
        );
      },
      error: (res) => {
        this.poNotification.error('Erro ao carregar pedidos');
      },
    });
  }

  get pedidosFiltrados() {
    switch (this.selectedStatus) {
      case StatusPedido.CONCLUIDO:
        return this.pedidosConcluidos ?? [];
      case StatusPedido.PROCESSANDO:
        return this.pedidosProcessando ?? [];
      case StatusPedido.CANCELADO:
        return this.pedidosCancelados ?? [];
      case StatusPedido.ENVIADO:
        return this.pedidoEnviado ?? [];
      default:
        return [];
    }
  }

  selecionarStatus(el: StatusPedido) {
    this.selectedStatus = el;
    this.setDeveMostrarBotaoConcluir();
  }

  openModal(id: string) {
    this.pedidoService.findOne(id).subscribe({
      next: (res) => {
        this.genericModal.openModal(
          res.pedido.itens,
          res.pedido.pedidoDetalhe.status
        );
      },
    });
  }

  atualizarPedido() {
    this.findAllPedidos();
  }

  concluirPedido(pedidoId: string) {
    this.pedidoService.concluirPedido(pedidoId).subscribe({
      next: (res) => {
        this.poNotification.success(res.message);
        this.atualizarPedido();
      },
      error: (res) => {
        this.poNotification.error('Erro ao concluir pedido');
        console.log(res);
      },
    });
  }

  setDeveMostrarBotaoConcluir() {
    this.deveMostrarBotaoConcluir =
      this.selectedStatus === StatusPedido.PROCESSANDO;
  }
}
