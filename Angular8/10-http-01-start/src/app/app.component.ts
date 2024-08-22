import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post-service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('postForm', { static: false }) tdForm: NgForm;
  loadedPosts = [];
  isFetching = false;
  error = null;
  private errSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.errSub = this.postService.error.subscribe(errorMessage => {
      this.isFetching = false;
      this.error = errorMessage;
    });
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
    this.FetchPosts();
    this.tdForm.reset();
  }

  onFetchPosts() {
    // Send Http request
    this.FetchPosts();
  }

  deleteSinglePost(postId: string) {
    this.postService.deleteSinglePost(postId).subscribe(() => {
      let tempArr = [];
      for (let lPost of this.loadedPosts) {
        if (lPost.id !== postId) {
          tempArr.push(lPost);
        }
      }
      this.loadedPosts = tempArr;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  private FetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching = false;
        this.error = error;
      }
    );
  }

  onHandleError() {
    this.isFetching = false;
    this.error = null;
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }
}
