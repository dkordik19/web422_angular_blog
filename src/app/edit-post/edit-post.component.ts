import { Component, OnInit } from '@angular/core';

import {PostService} from '../post.service';
import {Router, ActivatedRoute} from '@angular/router';
import { BlogPost } from '../BlogPost';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: String;
  private querySub: any;


  constructor(private service: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.service.getPostById(this.route.snapshot.params['id']).subscribe(data => 
      {
        this.blogPost = data;
        this.tags = this.blogPost.tags.toString();
      });  
  }

  formSubmit(submitForm:NgForm){
    this.tags.split(",").map(tag => tag.trim());
    this.querySub = this.service.updatePostById(this.blogPost._id, this.blogPost).subscribe((data) => { this.router.navigate([`/admin`]);});
  }

  deletePost()
  {
    this.querySub = this.service.deletePostById(this.blogPost._id).subscribe(() => {this.router.navigate(['/admin'])});
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
  }

}
