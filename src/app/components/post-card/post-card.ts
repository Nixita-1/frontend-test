import { Component, Input } from '@angular/core';
import { Post } from '../../types/post';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {
  @Input({ required: true }) post!: Post;
  @Input() highlightKeywords: string = '';

  constructor(private router: Router) {}

  goToArticle(post: Post) {
    this.router.navigate(['/post', post.id]);
  }

  highlightedParts(text: string, maxLength?: number): { value: string; highlight: boolean }[] {
    if (!text) return [{ value: '', highlight: false }];

    let truncatedText = maxLength ? text.slice(0, maxLength) : text;
    const keywords = this.highlightKeywords
      .toLowerCase()
      .split(/\s+/)
      .filter(k => k);

    if (!keywords.length) {
      return [{ value: truncatedText, highlight: false }];
    }

    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    const parts = truncatedText.split(regex);

    return parts.map(part => ({
      value: part,
      highlight: keywords.some(k => k.toLowerCase() === part.toLowerCase())
    }));
  }
}
