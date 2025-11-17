import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  PoButtonModule,
  PoFieldModule,
  PoNotificationService,
  PoWidgetModule,
} from '@po-ui/ng-components';
import ProdutoEntity from '../../interfaces/domain/produto.entity';
import { ProdutoService } from '../../services/produtos/produto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CriarPedidoDTO } from '../../interfaces/dto/criar-pedido.dto';
import { StatusPedido } from '../../enum/status-pedido.enum';
import { AuthService } from '../../services/auth/auth.service';
import { PedidoService } from '../../services/pedidos/pedido.service';
import { PedidoResponse } from '../../interfaces/response/pedido-response';
import { ProdutoPedidoDTO } from '../../interfaces/dto/produto-pedido.dto';
import { ProdutoModalComponent } from '../../shared/components/produto-modal/produto-modal.component';

@Component({
  selector: 'app-produtos',
  imports: [
    CommonModule,
    PoWidgetModule,
    PoButtonModule,
    PoFieldModule,
    FormsModule,
    ProdutoModalComponent,
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.less',
})
export class ProdutosComponent implements OnInit, OnDestroy {
  poNotification = inject(PoNotificationService);
  produtos: ProdutoEntity[] = [];
  addPedidoButtonClicado: boolean = false;
  produtoSelecionadoId: string = '';
  qtdSelecionado: number = 0;
  criarPedidoDTO!: CriarPedidoDTO;
  usuarioId: string = '';
  pedidos!: PedidoResponse;
  existePedidoProcessando: boolean = false;
  produtoPedido: ProdutoPedidoDTO[] = [];

  @ViewChild(ProdutoModalComponent, { static: false })
  produtoModal!: ProdutoModalComponent;

  constructor(
    private produtoService: ProdutoService,
    private authService: AuthService,
    private pedidoService: PedidoService
  ) {
    const loggedCliente = this.authService.getLoggedCliente();
    if (loggedCliente) {
      this.usuarioId = loggedCliente.id;
    }
  }

  ngOnInit(): void {
    this.criarPedidoDTO = {
      produtos: [],
      clienteId: this.usuarioId,
      status: StatusPedido.PROCESSANDO,
    };

    this.findAllProdutosPedidos();
  }

  findAllProdutosPedidos() {
    this.produtoService.findAll().subscribe({
      next: (res) => {
        this.produtos = res;
      },
      error: (res) => {
        this.poNotification.error('Erro ao carregar produtos');
        console.log(res);
      },
    });

    this.pedidoService.findAll().subscribe({
      next: (res) => {
        const pedidosProcessando = res.find(
          (p) => p.pedido.pedidoDetalhe.status === StatusPedido.PROCESSANDO
        );
        if (pedidosProcessando) {
          this.pedidos = pedidosProcessando.pedido;
          this.existePedidoProcessando = !!pedidosProcessando.pedido;
        }
      },
    });
  }

  ngOnDestroy(): void {}

  selecionarProduto(id: string) {
    this.produtoSelecionadoId = id;
    this.addPedidoButtonClicado = true;
  }

  isProdutoSelecionado(id: string) {
    return this.produtoSelecionadoId === id && this.addPedidoButtonClicado;
  }

  confirmarSelecaoProduto(item: ProdutoEntity) {
    if (this.existePedidoProcessando) {
      this.produtoPedido.push({
        id: item.id,
        quantidade: this.qtdSelecionado,
        preco: item.preco,
      });
    } else {
      this.criarPedidoDTO.produtos.push({
        id: item.id,
        preco: item.preco,
        quantidade: this.qtdSelecionado,
      });
    }

    this.resetProdutoSelecionado();
  }

  resetProdutoSelecionado() {
    this.produtoSelecionadoId = '';
    this.addPedidoButtonClicado = false;
    this.qtdSelecionado = 0;
  }

  isProdutoPedido(id: string) {
    return (
      !!this.pedidos &&
      (!!this.pedidos.itens.find((p) => p.produtoId === id) ||
        !!this.criarPedidoDTO.produtos.find((p) => p.id === id))
    );
  }

  removerProdutoPedido(id: string) {
    const produtos = this.criarPedidoDTO.produtos;
    const pedido = produtos.find((p) => p.id === id);
    if (pedido) {
      produtos.slice(produtos.indexOf(pedido));
    }
  }

  editarQuantidade(id: string) {
    this.pedidoService
      .editarQuantidadeItemPedido(id, this.qtdSelecionado)
      .subscribe({
        next: (res) => {
          this.poNotification.success(res);
          this.findAllProdutosPedidos();
        },
        error: (res) => {
          this.poNotification.success(res);
        },
      });
  }

  adicionarAoPedido() {
    if (this.existePedidoProcessando) {
      this.pedidoService
        .addItemtoPedido(this.pedidos.pedidoDetalhe.id, this.produtoPedido)
        .subscribe({
          next: (res) => {
            this.poNotification.success(res);
            this.findAllProdutosPedidos();
            this.produtoPedido = [];
          },
          error: (res) => {
            this.poNotification.error(res);
          },
        });
    } else {
      this.pedidoService.create(this.criarPedidoDTO).subscribe({
        next: (res) => {
          this.poNotification.success(res.message);
          this.findAllProdutosPedidos();
          this.produtoPedido = [];
        },
        error: (res) => {
          this.poNotification.error(res.message);
        },
      });
    }
  }

  deletePedidoItem(id: string) {
    const item = this.pedidos.itens.find((i) => i.produtoId === id);

    if (item) {
      this.pedidoService.deleteItem(item.id).subscribe({
        next: (res) => {
          this.poNotification.success(res.message);
          const novosItens = this.pedidos.itens.filter(
            (i) => i.produtoId !== id
          );
          this.pedidos.itens = novosItens;

          this.findAllProdutosPedidos();
        },
      });
    }
  }

  openProdutoModal(produto?: ProdutoEntity) {
    this.produtoModal.openModal(produto);
  }
}
