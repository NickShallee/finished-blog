import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from './common/services/auth-service';
import {PostService} from './common/services/post-service';
import {AuthorizeStep} from './common/pipelines/authorize-step';

@inject(EventAggregator, AuthService, PostService)
export class App {
  
  constructor(EventAggregator, AuthService, PostService) {
    this.eventAggregator = EventAggregator;
    this.authService = AuthService;
  	this.postService = PostService;

    this.eventAggregator.subscribe('auth-updated', response => {
      this.getUser();
    });

    this.eventAggregator.subscribe('post-updated', response => {
      this.getTags();
      this.getArchives();
    });

  }

	bind() {
    this.getArchives();
    this.getTags();
    this.getUser();
	}

  getArchives() {
    this.postService.allArchives().then(data => {
      if (data.error) {
        this.error = data.error;
      } else {
        this.archives = data.archives;
      }
    });
  }

  getTags() {
    this.postService.allTags().then(data => {
      if (data.error) {
        this.error = data.error;
      } else {
        this.tags = data.tags;
      }
    });
  }

  getUser() {
    this.currentUser = this.authService.currentUser;
  }

  configureRouter(config, router) {
    this.router = router;
  	config.title = 'My Blog';
    config.addAuthorizeStep(AuthorizeStep);
  	config.map([
  		{ route: '', name: 'home', moduleId: 'posts/index', title: 'All Posts' },
  		{ route: 'posts/:slug', name: 'post-view', moduleId: 'posts/view', title: 'View Post' },
      { route: 'tags/:tag', name: 'tag-view', moduleId: 'posts/tag', title: 'Posts by Tag' },
      { route: 'archives/:archive', name: 'archive-view', moduleId: 'posts/archives', title: 'Posts by Archive' },
      { route: 'login', name: 'login', moduleId: 'auth/login', title: 'Login' },
      { route: 'signup', name: 'signup', moduleId: 'auth/signup', title: 'Signup' },
      { route: 'new-post', name: 'newpost', moduleId: 'posts/create', title: 'New Post', settings: { auth: true } },
      { route: 'posts/:slug/edit', name: 'post-edit', moduleId: 'posts/edit', title: 'Edit Post', settings: { auth: true } }
  	]);
  }

  logout() {
    this.authService.logout().then(data => {
      this.eventAggregator.publish('auth-updated', new Date());
      this.router.navigateToRoute('home');
    });
  }

}
