import { Component } from '@angular/core';
import { PostModalComponent } from '../../app_modals/post-modal/post-modal.component';
import { NgIf, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../app_services/posts/posts.service';
import { Post } from '../../app_models/post.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  imports: [PostModalComponent, NgIf, NgClass, RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  displayModal: boolean = false;
  postForm!: FormGroup;

  constructor(private postService: PostsService, private fb: FormBuilder){
    this.postForm = this.fb.group({
      post_content: ['', [Validators.minLength(10), Validators.maxLength(300)]]
    })
  }
  
  openPostModal() {
    this.displayModal = true;
  }
  
  closePostModal() {
    this.displayModal = false;
  }

  publishPost()
  {
    if(!this.postForm.valid){return};
    
    const postData: any = {
      postContent : this.postForm.get('post_content')?.value,
      likesCount : 0,
      postDate : new Date(),
      postComments : 0,
      like : false
    };
    this.postService.newPost(postData);
  }
  
  displayModalSection(display?: boolean): void {
    if (display !== undefined) {
      this.displayModal = display;
    } else {
      this.displayModal = !this.displayModal;
    }
  }
}