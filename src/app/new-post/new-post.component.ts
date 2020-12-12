import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private post: PostService, private router: Router) { }

  blogPost: BlogPost = new BlogPost();
  tags: String;
  private querySub: any;


  formSubmit(submitForm:NgForm){
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim()); 
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "WEB422 Student";
    this.blogPost.views = 0;
    this.querySub = this.post.newPost(this.blogPost).subscribe(() => this.router.navigate(['/admin']));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
  }

}
