import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';

@inject(EventAggregator, Router, AuthService, PostService)
export class Edit {     

  constructor(EventAggregator, Router, AuthService, PostService) {
  	this.eventAggregator = EventAggregator;
  	this.router = Router;
    this.authService = AuthService;
    this.postService = PostService;
  	this.buttonText = 'Update Post';
  }

  activate(params) {
  	let slug = params.slug;
  	this.postService.find(slug).then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
        if (data.post.author !== this.authService.currentUser) {
          this.router.navigateToRoute('home');
        }
  			this.post = data.post;
  		}
  	});
  }

  update() {
  	this.postService.update(this.post).then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
  			this.eventAggregator.publish('post-updated', new Date());
  			this.router.navigateToRoute('post-view', {slug: data.slug});
  		}
  	})
  }

}