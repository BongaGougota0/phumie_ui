import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './post-modal.component.html',
  styleUrl: '../../authenticated_user/feed/feed.component.css'
})
export class PostModalComponent {
  @Output() close = new EventEmitter();
  @Output() post = new EventEmitter();
  postForm!: FormGroup;

  constructor(private fb: FormBuilder){
    this.postForm = this.fb.group({
      post_content : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(366)]]
    })
  }

  closePostModal() {
    this.close.emit(false);
  }

  publishPost() {
    if(this.postForm.invalid){
      return;
    }
    this.post.emit(this.postForm.get('post_content')?.value);
  }
}
