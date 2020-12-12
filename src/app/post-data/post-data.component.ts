import { Component, OnInit, OnDestroy } from '@angular/core';
import {BlogPost} from '../BlogPost';
import {PostService} from '../post.service';
import { ActivatedRoute } from '@angular/router';

import { NgForm } from '@angular/forms';
import { Comment } from '../Comment';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  post: BlogPost;
  private querySub: any;
  private routeSub: any;

  comment: Comment = new Comment()

  commentName: string;
  commentText: string;

  submitComment(submitForm:NgForm){

    this.comment.author = this.commentName;
    this.comment.comment = this.commentText;
    this.comment.date = new Date().toLocaleDateString();
    this.post.comments.push(this.comment);
    this.postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = "";
      this.commentText = "";
    })
  }



  constructor(private postService: PostService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params =>{ 
     this.querySub = this.postService.getPostById(params['id']).subscribe(data=>{
       this.post = data;

       this.post.views = this.post.views + 1;
       this.postService.updatePostById(this.post._id, this.post).subscribe(); 
     })
      //TODO: Get post by Id params['id'] and store the result in this.post 
    })  
    
    

  }

  ngOnDestroy() {
    this.querySub?.unsubscribe();
    this.routeSub?.unsubscribe();
  } 
 


}
