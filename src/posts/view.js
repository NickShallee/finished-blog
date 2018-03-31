import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';
import {PostService} from '../common/services/post-service';

@inject (EventAggregator, Router, AuthService, PostService)
export class View {     

  constructor(EventAggregator, Router, AuthService, PostService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
    this.postService = PostService;
  }

  activate(params) {
  	this.postService.find(params.slug).then(data => {
  	 this.post = data.post;
  	}).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
      this.router.navigateToRoute('home');
    });
  }

}