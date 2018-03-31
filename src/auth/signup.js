import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from '../common/services/auth-service';

@inject (Router, EventAggregator, AuthService)
export class Signup {     
  
  constructor(Router, EventAggregator, AuthService) {
  	this.router = Router;
  	this.ea = EventAggregator;
  	this.authService = AuthService;
  }

  signup() {
  	this.authService.signup(this.name).then(data => {
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