import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from '../common/services/post-service';

@inject (EventAggregator, PostService)
export class ArchiveView {     

  constructor(EventAggregator, PostService) {
    this.ea = EventAggregator;
    this.postService = PostService;
  }

  activate(params) {
  	this.archive = params.archive;
  	this.postService.postsByArchive(this.archive).then(data => {
  		this.posts = data.posts;
  	}).catch(error => {
  		this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
  	});
  }

}