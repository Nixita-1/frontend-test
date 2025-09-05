import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/postsService';
import { Post } from '../../types/post';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './post-info.html',
  styleUrl: './post-info.scss'
})
export class PostInfo implements OnInit {
  post: Post | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadPost(id);
    } else {
      this.error = 'invalid articlee id';
      this.loading = false;
    }
  }

  loadPost(id: number): void {
    this.postsService.getPostById(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (post) => {
          this.post = post;
        },
        error: (error) => {
          console.error('failed to load post', error);
          this.error = 'failed to load post';
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
