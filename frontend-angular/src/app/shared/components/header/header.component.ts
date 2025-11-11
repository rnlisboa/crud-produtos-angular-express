import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
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

@Component({
  selector: 'app-header',
  imports: [PoHeaderModule, PoButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
})
export class HeaderComponent {
  @ViewChild('meuTemplate') meuTemplate!: TemplateRef<any>;

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
    { label: 'Meus pedidos', action: this.myAction.bind(this, '/pedidos') },
  ];

  actionTools: Array<PoHeaderActionTool> = [
    {
      label: 'Configurações',
      icon: 'an an-gear-six',
      tooltip: 'Configurações do sistema',
      action: this.myAction.bind(this, 'Configuração'),
    },
    {
      label: 'Sair',
      icon: 'an an-sign-out',
      tooltip: 'Sair',
      action: this.myAction.bind(this, 'signout'),
    },
    {
      label: 'Notificações',
      icon: 'an an-chat-circle-dots',
      tooltip: 'Notificações do usuário',
      badge: 5,
      items: this.listItem,
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
    private authService: AuthService
  ) {}

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
}
