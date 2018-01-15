import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class Tag {     
  
  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
  	this.tag = params.tag;
  	this.postService.postsByTag(this.tag).then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
	  		this.posts = data.posts;
  		}
  	});
  }

}