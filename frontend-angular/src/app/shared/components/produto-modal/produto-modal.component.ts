import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  PoDynamicFormField,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
} from '@po-ui/ng-components';
import ProdutoEntity from '../../../interfaces/domain/produto.entity';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ProdutoService } from '../../../services/produtos/produto.service';
import { ProdutoDTO } from '../../../interfaces/dto/produto.dto';

@Component({
  selector: 'app-produto-modal',
  imports: [PoModalModule, DynamicFormComponent],
  templateUrl: './produto-modal.component.html',
  styleUrl: './produto-modal.component.less',
})
export class ProdutoModalComponent implements OnInit {
  poNotification = inject(PoNotificationService);
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  @Output() itensAtualizados = new EventEmitter<void>();

  produto!: ProdutoEntity;
  isEdicao: boolean = false;

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      minLength: 1,
      maxLength: 100,
      gridColumns: 12,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Nome do produto',
    },
    {
      property: 'descricao',
      minLength: 2,
      maxLength: 100,
      gridColumns: 12,
      gridSmColumns: 12,
      order: 2,
      placeholder: 'Descrição do produto',
    },
    {
      property: 'preco',
      label: 'Preço',
      minLength: 0,
      gridColumns: 12,
      gridSmColumns: 12,
      order: 3,
      placeholder: 'Preço do produto',
      type: 'currency',
      thousandMaxlength: 7,
    },
    {
      property: 'estoque',
      minLength: 0,
      gridColumns: 12,
      gridSmColumns: 12,
      order: 4,
      placeholder: 'Preço do produto',
      type: 'number',
    },
  ];

  constructor(private produtoService: ProdutoService) {}

  updateOrCreate() {
    if (!this.isEdicao) {
      const novoProduto = {
        nome: this.produto.nome,
        descricao: this.produto.descricao,
        preco: this.produto.preco,
        estoque: this.produto.estoque,
      };
      this.produtoService.create(novoProduto).subscribe({
        next: (res) => {
          this.poNotification.success(res.message);
          this.resetarProduto();
          this.itensAtualizados.emit();
        },
        error: (res) => {
          this.poNotification.error('Erro na operação');
          console.log(res);
        },
      });
    } else {
      if (!this.produto) return;

      const produtoAtualizado = {
        nome: this.produto.nome,
        descricao: this.produto.descricao,
        preco: this.produto.preco,
        estoque: this.produto.estoque,
      };
      this.produtoService.update(this.produto.id, produtoAtualizado).subscribe({
        next: (res) => {
          this.poNotification.success(res.message);
          this.itensAtualizados.emit();
        },
        error: (res) => {
          this.poNotification.error('Erro na operação');
          console.log(res);
        },
      });
    }
  }

  openModal(produto?: ProdutoEntity) {
    if (produto) {
      this.isEdicao = true;
      this.produto = produto;
    }
    this.poModal.open();
  }

  emitirProdutoAtualizadoOuCriado() {
    this.itensAtualizados.emit();
  }

  resetarProduto() {
    this.produto = {
      descricao: '',
      estoque: 0,
      preco: 0,
      id: '',
      nome: '',
    };
    this.isEdicao = false;
  }

  ngOnInit(): void {
    this.resetarProduto();
  }
}
