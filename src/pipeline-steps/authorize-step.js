import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';

@inject (AuthService)
export class AuthorizeStep {

	constructor(AuthService) {
		this.authService = AuthService;
	}

	run(navigationInstruction, next) {

		// If the user needs to be logged in, check for login
		if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
			if (!this.authService.currentUser) {
				return next.cancel(new Redirect('login'));
			}
		}

		return next();

	}

}