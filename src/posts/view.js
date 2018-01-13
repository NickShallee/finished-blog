import {inject} from 'aurelia-framework';
import {AuthService} from '../common/services/auth-service';
import {PostService} from '../common/services/post-service';

@inject (AuthService, PostService)
export class View {     
  
  constructor(AuthService, PostService) {
    this.authService = AuthService;
  	this.postService = PostService;
  }

  activate(params) {
    this.currentUser = this.authService.currentUser;
  	this.post = false;
  	let slug = params.slug;
  	this.postService.find(slug).then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
  			this.post = data.post;
  		}
  	});
  }

}