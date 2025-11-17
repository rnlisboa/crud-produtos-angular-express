import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  PoButtonModule,
  PoHeaderActions,
  PoHeaderActionTool,
  PoHeaderActionToolItem,
  PoHeaderBrand,
  PoHeaderModule,
  PoHeaderUser,
  PoNotificationService,
  PoToasterOrientation,
} from '@po-ui/ng-components';
import { AuthService } from '../../../services/auth/auth.service';
import { PedidoStateService } from '../../../store/pedido/pedido-state.service';

@Component({
  selector: 'app-header',
  imports: [PoHeaderModule, PoButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent implements OnInit {
  @ViewChild('meuTemplate') meuTemplate!: TemplateRef<any>;
  pedidosCount: number = 0;

  listItem: Array<PoHeaderActionToolItem> = [
    {
      label: 'Ação 1',
      action: this.myAction.bind(this, 'Ação 1'),
    },
    { label: 'Ação 2', action: this.myAction.bind(this, 'Ação 2') },
    { label: 'Ação 3', action: this.myAction.bind(this, 'Ação 3') },
  ];

  headerBrand: PoHeaderBrand = {
    title: 'Store UFUNCTION',
    logo: 'https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/FCBarcelona.svg/2020px-FCBarcelona.svg.png',
    action: this.myAction.bind(this, 'Logo ação'),
  };

  menuItems: Array<PoHeaderActions> = [
    {
      label: 'Produtos',
      action: this.myAction.bind(this, '/produtos'),
    },
  ];

  actionTools: Array<PoHeaderActionTool> = [
    {
      label: 'Sair',
      icon: 'an an-sign-out',
      tooltip: 'Sair',
      action: this.myAction.bind(this, 'signout'),
    },
    {
      label: 'Carrinho',
      icon: 'an an-shopping-cart',
      tooltip: 'Meu carrinho',
      badge: 0,
      action: this.myAction.bind(this, '/pedidos'),
    },
  ];

  headerUser: PoHeaderUser = {
    avatar:
      'https://e7.pngegg.com/pngimages/132/874/png-clipart-lionel-messi-fc-barcelona-argentina-national-football-team-la-liga-copa-del-rey-lionel-messi-face-head-thumbnail.png',
    customerBrand:
      'https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/FCBarcelona.svg/2020px-FCBarcelona.svg.png',
    action: this.myAction.bind(this, '/clientes'),
    status: 'positive',
  };

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private pedidosState: PedidoStateService
  ) {}

  ngOnInit(): void {
    this.pedidosState.pedidos$.subscribe({
      next: (res) => {
        if (res.pedido) {
          this.pedidosCount = res.pedido.pedidoDetalhe.quantidade;
          this.updateCartBadge();
        }
      },
    });
  }

  ngAfterViewInit(): void {
    this.actionTools = this.actionTools.map((action) => {
      if (action.popover) {
        return {
          ...action,
          popover: {
            ...action.popover,
            content: this.meuTemplate,
          },
        };
      }
      return action;
    });

    this.cd.detectChanges();
  }

  myAction(action: string): any {
    if (action === 'signout') {
      this.authService.logout();
    } else {
      this.redirect(action);
    }
  }

  redirect(target: string) {
    this.router.navigate([target]);
  }

  private updateCartBadge() {
    this.actionTools = this.actionTools.map((tool) => {
      if (tool.label === 'Carrinho') {
        return {
          ...tool,
          badge: this.pedidosCount,
        };
      }
      return tool;
    });

    this.cd.detectChanges();
  }
}
