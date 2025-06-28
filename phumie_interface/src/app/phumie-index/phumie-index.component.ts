import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../app_models/post.model';
import { PostsService } from '../app_services/posts/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-phumie-index',
  imports: [RouterLink, NgFor],
  templateUrl: './phumie-index.component.html',
  styleUrl: '../authenticated_user/feed/feed.component.css'
})
export class PhumieIndexComponent {
  posts: Post[] = [];
  postsSubscription = new Subscription;

  constructor(private route: Router, private postService: PostsService){}

  openPostModal()
  {
    this.route.navigate(['login']);
  }

  ngOnInit(){
    this.postsSubscription = this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.log(`Error occured fetching posts ${err}`);
      }
    })
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  readPost(postId: any) {
    console.log(`navigating to view post.`);
    this.route.navigateByUrl('/post', postId);
  }
}
