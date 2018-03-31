import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';

@inject (EventAggregator, Router, AuthService, PostService)
export class Edit {     

  constructor(EventAggregator, Router, AuthService, PostService) {
  	this.ea = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
    this.postService = PostService;
  }

  activate(params) {
    this.postService.find(params.slug).then(data => {
      // First check authorship
      if (data.post.author !== this.authService.currentUser) {
        this.router.navigateToRoute('home');
      }
    	this.post = data.post;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: 'Post not found.'
      });
      this.router.navigateToRoute('home');
    });
    this.title = 'editPost';
  }

  editPost() {
  	this.postService.update(this.post).then(data => {
      this.ea.publish('post-updated', Date());
      this.ea.publish('toast', {
        type: 'success',
        message: 'Post edited!'
      });
  		this.router.navigateToRoute('post-view', {slug: data.slug});
  	}).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
  	});
  }

}