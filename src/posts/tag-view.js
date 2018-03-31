import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from '../common/services/post-service';

@inject (EventAggregator, PostService)
export class TagView {     

  constructor(EventAggregator, PostService) {
    this.ea = EventAggregator;
    this.postService = PostService;
  }

  activate(params) {
  	this.tag = params.tag;
  	this.postService.postsByTag(this.tag).then(data => {
  		this.posts = data.posts;
  	}).catch(error => {
  		this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
  	});
  }

}