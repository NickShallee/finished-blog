import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';

@inject(EventAggregator, Router, PostService)
export class Create {

  constructor(EventAggregator, Router, PostService) {
  	this.eventAggregator = EventAggregator;
  	this.router = Router;
    this.postService = PostService;
    this.buttonText = 'Create Post';
  }

  bind() {
  	this.post = {
  		title: '',
  		body: '',
  		tags: []
  	};
  	this.postService.allTags().then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
  			this.allTags = data.tags;
  		}
  	})
  }     

	addTag() {
		this.allTags.push(this.newTag);
		this.post.tags.push(this.newTag);
		this.newTag = '';
	}

  create() {
  	this.postService.create(this.post).then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
  			this.eventAggregator.publish('post-updated', new Date());
  			this.router.navigateToRoute('home');
  		}
  	});
  }

}