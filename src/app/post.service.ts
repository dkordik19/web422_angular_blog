import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BlogPost } from './BlogPost';

const perPage = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  //A6
  getAllPosts():Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`https://kordik-web422-blog.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);

  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://kordik-web422-blog.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://kordik-web422-blog.herokuapp.com/api/posts/${id}`, data); 
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://kordik-web422-blog.herokuapp.com/api/posts/${id}`); 
  }



  getPosts(page, tag, category): Observable<BlogPost[]> {
    let httpString = `https://kordik-web422-blog.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;
    if(tag){
      // need add check for "#" 
      httpString +=`&tag=${tag}`;
    };
    if(category) httpString += `&category=${category}`;

    return this.http.get<BlogPost[]>(httpString);

  }
  

  getPostById(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://kordik-web422-blog.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>(`https://kordik-web422-blog.herokuapp.com/api/categories`);

  }


  getTags(): Observable<string[]>{
    return this.http.get<string[]>(`https://kordik-web422-blog.herokuapp.com/api/tags`);
  }
}
