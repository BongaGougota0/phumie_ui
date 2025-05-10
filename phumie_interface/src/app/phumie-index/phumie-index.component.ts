import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-phumie-index',
  imports: [RouterLink, NgFor],
  templateUrl: './phumie-index.component.html',
  styleUrl: '../authenticated_user/feed/feed.component.css'
})
export class PhumieIndexComponent {

  constructor(private route: Router){}

  openPostModal()
  {
    this.route.navigate(['login']);
  }
}
