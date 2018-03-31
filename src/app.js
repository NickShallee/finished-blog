import {inject, signalBindings} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import * as toastr from 'toastr';
import {AuthService} from './common/services/auth-service';
import {PostService} from './common/services/post-service';
import {AuthorizeStep} from './pipeline-steps/authorize-step';

@inject (EventAggregator, I18N, AuthService, PostService)
export class App {

  constructor(EventAggregator, I18N, AuthService, PostService) {
  	this.ea = EventAggregator;
    this.i18n = I18N;
    this.authService = AuthService;
    this.postService = PostService;
  }

  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    });

    this.updateSidebar();
    this.postSubscription = this.ea.subscribe('post-updated', updatedAt => {
      this.updateSidebar();
    });

    this.toastSubscription = this.ea.subscribe('toast', toast => {
      toastr[toast.type](toast.message);      
    })
  }

  updateSidebar() {
    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });    
  }

  configureRouter(config, router) {
    this.router = router;
  	config.title = 'Nick\'s Blog';
    config.addAuthorizeStep(AuthorizeStep);
  	config.map([
      { route: '', name: 'home', moduleId: 'posts/index', title: 'All Posts' },
      { route: 'login', name: 'login', moduleId: 'auth/login', title: 'Log In' },
      { route: 'signup', name: 'signup', moduleId: 'auth/signup', title: 'Sign Up' },
      { route: 'create-post', name: 'create-post', moduleId: 'posts/create', title: 'Create Post', settings: { auth: true } },
      { route: 'post/:slug', name: 'post-view', moduleId: 'posts/view', title: 'View Post' },
      { route: 'post/:slug/edit', name: 'post-edit', moduleId: 'posts/edit', title: 'Edit Post', settings: { auth: true } },
      { route: 'tag/:tag', name: 'tag-view', moduleId: 'posts/tag-view', title: 'View Posts by Tag' },
      { route: 'archive/:archive', name: 'archive-view', moduleId: 'posts/archive-view', title: 'View Posts by Archive' }
  	]);
  }

  detached() {
    this.subscription.dispose();
    this.postSubscription.dispose();
    this.toastSubscription.dispose();
  }

  logout() {
    this.authService.logout().then(data => {
      this.ea.publish('user', null);
      this.ea.publish('toast', {
        type: 'success',
        message: 'You have successfully logged out.'
      });
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
  }

  setLocale(locale) {
    this.i18n.setLocale(locale).then(() => {
      this.ea.publish('locale-changed', Date());
      signalBindings('locale-changed');
    });
  }

}
