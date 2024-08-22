import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {

  error = new Subject<string>();
  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http.post<{ name: string }>(
      // '/post' and '.json' extension is required only in firebase
      "https://ng-complete-guide-e124b.firebaseio.com/post.json", postData,
      {
        observe: 'response'
      })
      .subscribe(responseData => {
        console.log(responseData)
      }, error => {
        this.error.next(error);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }>(
      'https://ng-complete-guide-e124b.firebaseio.com/post.json',
      {
        'headers': new HttpHeaders({ 'Custom-Header': 'Hello' }),
        // 'params':new HttpParams().set('print','pretty')
        params: searchParams,
        responseType: 'json'
      })
      .pipe(map(responseData => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        console.log(responseData);
        console.log(postArray);
        return postArray;
      }), catchError(errRes => {
        //send analytics to server
        return throwError(errRes);
      })
      );
  }
  deletePosts() {
    return this.http.delete('https://ng-complete-guide-e124b.firebaseio.com/post.json', {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap(event => {
      console.log(event);
      if (event.type == HttpEventType.Sent) {
        console.log('Recieved Delete Request');
      }
      if (event.type == HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }

  deleteSinglePost(id: string) {
    return this.http.delete('https://ng-complete-guide-e124b.firebaseio.com/post/' + id + '.json', {
      observe: 'events',
      responseType: 'text'
    }).pipe(tap(event => {
      console.log(event);
      if (event.type == HttpEventType.Sent) {
        console.log('Recieved Delete Request');
      }
      if (event.type == HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}