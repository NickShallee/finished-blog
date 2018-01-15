import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class Index {     

  constructor(PostService) {
    this.postService = PostService;
  }

  bind() {
  	this.postService.allPostPreviews().then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
	  		this.posts = data.posts;
  		}
  	});
  }

}