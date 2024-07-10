import { Component, HostBinding } from '@angular/core';
import { AccountService } from '../_services';
import { ThemeService } from '../_services/theme.service'
import { User } from '../_models';
@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent {
  @HostBinding('class.expanded') expanded: boolean = true;
  
  user?: User | null;

  constructor(private accountService: AccountService, private themeService: ThemeService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  switchTheme(theme: string): void {
    this.themeService.applyTheme(theme);
  }

  logout() {
      this.accountService.logout();
  }
}
