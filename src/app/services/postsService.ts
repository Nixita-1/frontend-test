import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Post } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) {}

  getPosts(): Observable <ApiResponse<Post>> {
    return this.http.get<ApiResponse<Post>>(this.postsUrl)
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}${id}/`);
  }
}
