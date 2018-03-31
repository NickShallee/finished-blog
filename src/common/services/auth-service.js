export class AuthService {

	constructor() {
		this.delay = 100;
		this.currentUser = null;
		this.users = ['Nick Shallee', 'Jane Doe'];
	}

	login(name) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				if (this.users.includes(name)) {
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject(new Error('Invalid credentials.'));
				}
		  }, this.delay);
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				this.currentUser = null;
				if (this.currentUser) {
					reject(new Error('Error logging out.'));
				} else {
					resolve({ success: true });
				}
		  }, this.delay);
		});	
	}

	signup(name) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				if (!this.users.includes(name)) {
					this.users.push(name);
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject(new Error('This user already exists.'));
				}
		  }, this.delay);
		});		
	}

}