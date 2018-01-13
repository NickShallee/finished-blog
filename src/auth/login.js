import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';

@inject(EventAggregator, Router, AuthService)
export class Login {     
  
  constructor(EventAggregator, Router, AuthService) {
  	this.eventAggregator = EventAggregator;
  	this.router = Router;
  	this.authService = AuthService;
  }

  login() {
  	this.authService.login(this.name).then(data => {
  		if (data.error) {
  			this.error = data.error;
  		} else {
  			this.error = null;
	  		this.eventAggregator.publish('auth-updated', new Date());
	  		this.router.navigateToRoute('home');
  		}
  	});
  }

}