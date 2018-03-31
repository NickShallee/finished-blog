import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import {ValidationRules, ValidationControllerFactory, validationMessages} from 'aurelia-validation';
import {PostService} from '../../common/services/post-service';

@inject(EventAggregator, I18N, ValidationControllerFactory, PostService)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(EventAggregator, I18N, ValidationControllerFactory, PostService) {
  	this.ea = EventAggregator;
    this.i18n = I18N;
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.postService = PostService;
    this.localeSubscription = this.ea.subscribe('locale-changed', updatedAt => {
      this.setValidation();
    })
  }

  attached() {
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });  	
  }

  detatched() {
    this.localeSubscription.dispose();
  }

  addTag() {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  submit() {

  }

  postChanged(newValue, oldValue) {
    this.setValidation();
  }

  setValidation() {
    if(this.post) {
      validationMessages['required'] = this.i18n.tr('post-form:requiredField');

      ValidationRules
        .ensure('title').displayName(this.i18n.tr('post-form:title'))
          .required()
          .minLength(5)
        .ensure('body').displayName(this.i18n.tr('post-form:body')).required()
        .on(this.post);

      this.controller.validate();
    }    
  }

}

