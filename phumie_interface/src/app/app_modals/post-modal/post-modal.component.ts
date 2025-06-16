import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-modal',
  imports: [],
  templateUrl: './post-modal.component.html',
  styleUrl: '../../authenticated_user/feed/feed.component.css'
})
export class PostModalComponent {
  @Output() close = new EventEmitter();

  closePostModal() {
    this.close.emit(false);
  }
}
