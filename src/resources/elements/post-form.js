import {bindable, inject} from 'aurelia-framework';
import {ValidationControllerFactory, ValidationRules} from 'aurelia-validation';
import {PostService} from '../../common/services/post-service';

@inject(ValidationControllerFactory, PostService)
export class PostForm {
  @bindable post;
  @bindable button;

  constructor(ValidationControllerFactory, PostService) {
  	this.controller = ValidationControllerFactory.createForCurrentScope();
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
    this.addValidationRules();
  }

	addTag() {
		this.allTags.push(this.newTag);
		this.post.tags.push(this.newTag);
		this.newTag = '';
	}

	submit() {
  }

  postChanged(newValue, oldValue) {
    this.addValidationRules();
  }

  addValidationRules() {
    if (this.post) {
      ValidationRules
        .ensure('title').required()
        .ensure('body').required()
        .on(this.post);    
      this.controller.validate();
    }
  }

}