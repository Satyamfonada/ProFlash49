import { Component } from '@angular/core';
import { WHATSAPP_ICON, TELEGRAM_ICON, CALLBACK_ICON, DOWNARROW_ICON } from 'src/app/_constants'
@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  whatsAppIcon: string = WHATSAPP_ICON;
  telegramIcon: string = TELEGRAM_ICON;
  callbackIcon: string = CALLBACK_ICON;
  downArrowIcon: string = DOWNARROW_ICON;

  redirectToWhatsApp() {
    window.open('https://api.whatsapp.com/send?phone=9958788916', '_blank');
  }

  redirectToTelegram() {
    window.open('https://t.me/your_channel', '_blank');
  }

  makePhoneCall() {
    window.open('tel:+919958788916');
  }
}
