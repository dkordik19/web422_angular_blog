import { Component, OnInit, OnDestroy} from '@angular/core';
import {PostService} from'../post.service';

import {BlogPost} from '../BlogPost';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {
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
