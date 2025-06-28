import { Component } from '@angular/core';
import { Comment, Post } from '../../app_models/post.model';
import { PostsService } from '../../app_services/posts/posts.service';
import { Subscription, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [DatePipe, NgFor],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  comments : Comment[] = [];
  post!: Post;
  commentsSubscription = new Subscription;
  postSubscription = new Subscription;
  
  constructor(private postsService: PostsService, private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    const postId : number = +(this.activatedRoute.snapshot.paramMap.get('id') || 0);
    console.log(`Found route param as ${postId}`);
    if(postId){
      this.postSubscription = this.postsService.getPostById(postId).subscribe({
        next: (postObj) => {
          this.post = postObj;
          this.getPostsComments(postId);
        },
        error: (err) => {
          console.log(`An error occured, ${err}`);
        }
      })
    }
  }

  getPostsComments(postId: number) {
    this.commentsSubscription = this.postsService.getPostComments(postId).subscribe({
      next: (resp) => {
        this.comments = resp;
      },
      error: (err) => {
        console.log(`Error fetching post comments ${err}`);
      }
    })
  }

  ngOnDestroy() {
    if(this.commentsSubscription){
      this.commentsSubscription.unsubscribe();
    }
    if(this.postSubscription){
      this.postSubscription.unsubscribe();
    }
  }

}
