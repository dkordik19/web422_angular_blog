import { Component, OnInit, OnDestroy} from '@angular/core';
import {PostService} from'../post.service';

import {BlogPost} from '../BlogPost';
@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit {
  posts: Array<BlogPost>;
  private querySub: any;
  

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.querySub = this.postService.getPosts(1, null, null).subscribe(data=>{
      this.posts = data.slice(0,3);
    })
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();

  }

}
