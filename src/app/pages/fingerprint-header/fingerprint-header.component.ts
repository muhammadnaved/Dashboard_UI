import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fingerprint-header',
  templateUrl: './fingerprint-header.component.html',
  styleUrls: ['./fingerprint-header.component.css']
})
export class FingerprintHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  refresh(): void {
    window.location.reload();
    }

    home(): void {
        location.href = "https://claribel.net/";
    }
    aboutUs(): void {
        location.href = "https://claribel.net/about-us";
    }
    productAndServices(): void {
        location.href = "https://claribel.net/products-%26-services";
    }
    resources(): void {
        location.href = "https://claribel.net/resources";
    }
    contactUs(): void {
        location.href = "https://claribel.net/contact-us";
    }

}
