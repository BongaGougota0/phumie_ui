import { Component } from '@angular/core';
import { Comment, Post } from '../../app_models/post.model';
import { PostsService } from '../../app_services/posts/posts.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  comments : Comment[] = [];
  post!: Post;
  commentsSubscription = new Subscription;
  postSubscription = new Subscription;
  
  constructor(private postsService: PostsService, private router: Router,
    private activatedRoute: ActivatedRouteSnapshot
  ){}

  ngOnInit() {
    const postId : any = this.activatedRoute.paramMap.get('id');
    if(postId){
      this.postSubscription = this.postsService.getPostById(postId).subscribe({
        next: (postObj) => {
          this.post = postObj;
        },
        error: (err) => {
          console.log(`An error occured, ${err}`);
        }
      })
    }
    this.getPosts();
  }

  getPosts() {
    // this.commentsSubscription = this.postsService.getPosts
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
