import { PostsService } from './../../services/postsService';
import { Component, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Post } from '../../types/post';
import { PostCard } from '../../components/post-card/post-card';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [Header, PostCard, CommonModule, FormsModule],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.scss'
})
export class PostsList implements OnInit {
  posts: Post[] = [];
  filteredPosts$ = new BehaviorSubject<Post[]>([]);
  searchKeyword$ = new BehaviorSubject<string>('');
  loading = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          this.posts = res.results;
          this.filteredPosts$.next(this.posts);
          this.setupFiltering();
        },
        error: (error) => console.error('failed to load posts', error)
      });
  }

  setupFiltering() {
    combineLatest([
      this.searchKeyword$
    ]).subscribe(([keyword]) => {
      if (!keyword.trim()) {
        this.filteredPosts$.next(this.posts);
        return;
      }

      const keywords = keyword.toLowerCase().split(/\s+/).filter(k => k);

      const filtered = this.posts
        .map(post => {
          const nameMatches = keywords.some(k => post.title.toLowerCase().includes(k));
          const descMatches = keywords.some(k => post.summary.toLowerCase().includes(k));
          return {
            ...post,
            _matchPriority: nameMatches ? 2 : descMatches ? 1 : 0
          };
        })
        .filter(p => p._matchPriority > 0)
        .sort((a, b) => b._matchPriority - a._matchPriority);

      this.filteredPosts$.next(filtered);
    });
  }

  onSearchChange(value: string) {
    this.searchKeyword$.next(value);
  }

  trackById(index: number, post: Post) {
    return post.id;
  }
}
