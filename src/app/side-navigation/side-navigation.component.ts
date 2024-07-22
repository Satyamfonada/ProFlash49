import { Component, HostBinding } from '@angular/core';
import { User } from '../_models';
import { AccountService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent {
  @HostBinding('class.expanded') expanded: boolean = true;
  @HostBinding('attr.aria-expanded') isExpanded: boolean = false;
  activeIndex = 0;
  user: User | null;
  constructor(private accountService: AccountService, private router: Router) {
    // this.user = this.accountService.userValue
    const session = JSON.parse(sessionStorage.getItem('user')!);
    this.user = session?.result?.username || "Foanda"
  }
  ngOnInit() {
    let isAdmin = this.accountService.hasRole('admin');
    if ((isAdmin['username'] != 'admin')) {
      this.dropdownList = this.dropdownList.filter(item => {
        return item.menu === 'General' || item.menu === 'Address' || item.menu === 'Bulk SMS' || item.menu === 'Template Management' || item.menu === 'Sender ID Management' || item.menu === 'Reporting';
      });
    }

    this.isExpand(0);
  }
  toggleButton() {
    this.expanded = !this.expanded;
    this.isExpanded = false;
  }

  dropdownList = [
    {
      menu: 'General',
      icon: 'fa fa-home',
      dropdown: [
        { title: 'Dashboard', route: "/" }], showDropdown: true
    },
    {
      menu: 'Admin',
      icon: 'fa fa-edit',
      dropdown: [
        { title: 'User Management', route: "/user-management" },
        { title: 'Senders Management', route: "/senders-management" },
        { title: 'Routes Management', route: "/route-management" },
        { title: 'Filter Management', route: "/filter-management" },
      ],
      showDropdown: true
    },
    {
      menu: 'Address',
      icon: 'fa fa-address-book',
      dropdown: [
        { title: 'Manage', route: "/userBases" }
      ], showDropdown: false
    },
    {
      menu: 'Bulk SMS',
      icon: 'fa fa-bullhorn',
      dropdown: [
        { title: 'Campaigns', route: "/campaigns" },
        { title: 'Executions', route: "/executions" },
        { title: 'Scheduled', route: "/scheduled" },
        { title: 'HTTP', route: "/http-api" },
        { title: 'Url Management', route: "/url-management" },
      ], showDropdown: false
    },
    {
      menu: 'Template Management',
      icon: 'fa fa-exchange',
      dropdown: [
        { title: 'Manage Template', route: "/manage-template" }
      ], showDropdown: false
    },
    {
      menu: 'Sender ID Management',
      icon: 'fa fa-paper-plane',
      dropdown: [
        { title: 'Request Sender', route: "/request-sender" }
      ], showDropdown: false
    },
    {
      menu: 'Reporting',
      icon: 'fa fa-bar-chart-o',
      dropdown: [
        { title: 'Message History', route: "/message-history" },
        { title: 'MIS Tool', route: "/mis-tool-reports" }
      ], showDropdown: false
    },
  ];

  toggleDropdown(index: number): void {
    this.activeIndex = index;
    this.dropdownList.forEach((item, i) => {
      if (i === index) {
        item.showDropdown = true;
      } else {
        item.showDropdown = false;
      }
    });
  }
  // toggleDropdown(index: number): void {
  //   this.activeIndex = this.activeIndex === index ? -1 : index;
  //   this.dropdownList.forEach((item, i) => {
  //     if (i === index) {
  //       item.showDropdown = !item.showDropdown;
  //     } else {
  //       item.showDropdown = false;
  //     }
  //   });
  // }

  isExpand(index: number) {
    return index === this.activeIndex ? "true" : "false";
   
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
