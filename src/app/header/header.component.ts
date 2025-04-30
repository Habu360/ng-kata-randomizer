import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = "Kata Randomizer 2.0";
  obkLogo: string = "../assets/obk_logo.jpg";
}
