import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Post } from '../app_models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-view',
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css'
})
export class PostViewComponent {
  commentForm!: FormGroup;
  @Input() post!: Post;
  @Input() comments?: Comment[];

  constructor(private router: Router, private fb: FormBuilder){
    this.commentForm = this.fb.group({
      postComment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)]]
    })
  }

  ngOnInit() {

  }

}
