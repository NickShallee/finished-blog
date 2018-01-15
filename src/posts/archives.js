import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class Archives {     
  
  constructor(PostService) {
    this.postService = PostService;
  }

  activate(params) {
  	this.archive = params.archive;
  	this.postService.postsByArchive(this.archive).then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
	  		this.posts = data.posts;
  		}
  	});
  }

}