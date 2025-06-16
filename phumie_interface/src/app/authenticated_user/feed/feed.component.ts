import { Component } from '@angular/core';
import { PostModalComponent } from '../../app_modals/post-modal/post-modal.component';
import { NgIf, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../app_services/posts/posts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed',
  imports: [PostModalComponent, NgIf, NgClass, RouterLink, ReactiveFormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  displayModal: boolean = false;
  postForm!: FormGroup;

  constructor(private postService: PostsService, private fb: FormBuilder){
    this.postForm = this.fb.group({
      post_content: ['', [Validators.minLength(10), Validators.maxLength(366)]]
    })
  }
  
  openPostModal() {
    this.displayModal = true;
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
    this.postService.newPost(postData).subscribe({
      next: (resp) => {
        this.postForm.get('post_content')?.reset();
      },
      error: (err) => {
        console.log(`handle error on post ${err}`);
      }
    });
  }
  
  displayModalSection(display?: boolean): void {
    if (display !== undefined) {
      this.displayModal = display;
    } else {
      this.displayModal = !this.displayModal;
    }
  }

  publishPostEvent(post_content: string){
    if(post_content){
      const postData: any = {
        postContent : post_content,
        likesCount : 0,
        postDate : new Date(),
        postComments : 0,
        like : false
      }
      this.postService.newPost(postData).subscribe({
        next: (resp) => {
          console.log(resp);
          this.displayModalSection(false);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  handleModalEvent(eventName: boolean){
    this.displayModalSection(eventName);
  }
}