import {bindable, inject} from 'aurelia-framework';
import {PostService} from '../../common/services/post-service';

@inject(PostService)
export class PostForm {
  @bindable post;
  @bindable button;

  valueChanged(newValue, oldValue) {

  }

  constructor(PostService) {
  	this.postService = PostService;
  }

  bind() {
  	this.postService.allTags().then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
  			this.allTags = data.tags;
  		}
  	});
  }

	addTag() {
		this.allTags.push(this.newTag);
		this.post.tags.push(this.newTag);
		this.newTag = '';
	}

	submit() {}

}

