import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  PoButtonModule,
  PoNotificationService,
  PoWidgetModule,
} from '@po-ui/ng-components';
import ProdutoEntity from '../../interfaces/domain/produto.entity';
import { ProdutoService } from '../../services/produtos/produto.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produtos',
  imports: [CommonModule, PoWidgetModule, PoButtonModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.less',
})
export class ProdutosComponent implements OnInit, OnDestroy {
  poNotification = inject(PoNotificationService);
  produtos: ProdutoEntity[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.findAll().subscribe({
      next: (res) => {
        this.produtos = res;
      },
      error: (res) => {
        this.poNotification.error('Erro ao carregar produtos');
        console.log(res);
      },
    });
  }

  ngOnDestroy(): void {}

  
}
