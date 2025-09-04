import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () =>
    import('./pages/posts-list/posts-list').then((m) => m.PostsList),
   },
  { path: 'post/:id', loadComponent: () =>
    import('./pages/post-info/post-info').then((m) => m.PostInfo)
  }
];
