import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';

@inject (EventAggregator, Router, AuthService)
export class Login {     

  constructor(EventAggregator, Router, AuthService) {
  	this.ea = EventAggregator;
  	this.router = Router;
  	this.authService = AuthService;
  }

  login() {
  	this.authService.login(this.name).then(data => {
  		this.ea.publish('user', data.name);
  		this.router.navigateToRoute('home');
  	}).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
  	});
  }

}