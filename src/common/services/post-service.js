import {inject} from 'aurelia-framework';
import {AuthService} from './auth-service';

@inject(AuthService)
export class PostService {

	constructor(AuthService) {
		this.authService = AuthService;
		// Fake a server response delay
		this.delay = 100;
		// Seed post data if it doesn't exist
		if (!this.posts) {
			this.posts = [
				{
					title: 'My first post',
					body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
					author: 'Nick Shallee',
					slug: 'my-first-post',
					tags: ['aurelia', 'lorem', 'javascript'],
					createdAt: new Date('July 1, 2017')
				},
				{
					title: 'My second post',
					body: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with ',
					author: 'Jane Doe',
					slug: 'my-second-post',
					tags: ['javascript', 'learning'],
					createdAt: new Date('August 17, 2017')
				},
				{
					title: 'My third post',
					body: 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What\'s happened to me? " he thought. It wasn\'t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn\'t get into that position. However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn\'t have to look at the floundering legs, and only stopped when ',
					author: 'Nick Shallee',
					slug: 'my-third-post',
					tags: ['kafka'],
					createdAt: new Date('December 1, 2017')
				}
			]
		}
	}

	allPostPreviews() {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	if (this.posts) {
		  		let previews = this.posts.map(post => {
			  		return {
			  			title: post.title,
			  			body: post.body.substring(0,200) + '...',
			  			author: post.author,
			  			slug: post.slug,
			  			tags: post.tags,
			  			createdAt: post.createdAt
			  		}
			  	});
			  	previews.sort((a,b) => b.createdAt - a.createdAt);
			  	resolve({ posts: previews });
		  	} else {
		  		reject(new Error('There was an error retrieving the posts.'));
		  	}
		  }, this.delay);
		});		
	}

	allArchives() {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let archives = [];
		  	this.posts.sort((a,b) => b.createdAt - a.createdAt);
		  	this.posts.forEach(post => {
		  		archives.push(`${months[post.createdAt.getMonth()]} ${post.createdAt.getFullYear()}`);
		  	});
		  	if (archives) {	
			  	resolve({ archives: archives.filter((v, i, a) => a.indexOf(v) === i) });		  		
		  	} else {
		  		reject(new Error('There was an error retrieving the archives.'));
		  	}
		  }, this.delay);
		});		
	}

	allTags() {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let tags = [];
		  	this.posts.forEach(post => {
		  		tags = tags.concat(post.tags);
		  	});
		  	if (tags) {	
			  	resolve({ tags: tags.filter((v, i, a) => a.indexOf(v) === i) });		  		
		  	} else {
		  		reject(new Error('There was an error retrieving the tags.'));
		  	}
		  }, this.delay);
		});		
	}

	create(post) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let currentUser = this.authService.currentUser;
		  	let slug = this.slugify(post.title);
				if (currentUser) {
					this.posts.push({
						title: post.title,
						body: post.body,
						author: currentUser,
						slug,
						tags: post.tags,
						createdAt: new Date()						
					});
					resolve({ slug });
				} else {
					reject(new Error('You must be logged in to create a post.'));
				}
		  }, this.delay);
		});	
	}

	find(slug) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	let post = this.posts.sort((a,b) => b.createdAt - a.createdAt).find(post => post.slug.toLowerCase() === slug.toLowerCase());
		  	if (post) {
			  	resolve({ post });
		  	} else {
		  		reject(new Error('Post not found.'));
		  	}
		  }, this.delay);
		});	
	}

	postsByTag(tag) {		
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	if (!this.posts) {
		  		reject(new Error('Error finding posts.'));
		  	} else {
			  	resolve({ posts: this.posts.filter(post => post.tags.includes(tag)).sort((a,b) => b.createdAt - a.createdAt) });
		  	}
		  }, this.delay);
		});			
	}

	postsByArchive(archive) {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	if (!this.posts) {
		  		reject(new Error('Error finding posts.'));
		  	} else {
			  	resolve({ posts: this.posts.filter(post => {
			  		return archive === `${months[post.createdAt.getMonth()]} ${post.createdAt.getFullYear()}`;
			  	}).sort((a,b) => b.createdAt - a.createdAt) });
		  	}
		  }, this.delay);
		});			
	}

	slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
	}

	update(post) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
		  	// Get post based on slug and auther
		  	let toUpdate = this.posts.find(x => {
		  		return x.slug === post.slug && x.author === this.authService.currentUser;
		  	})
		  	if (!toUpdate) {
		  		reject(new Error('There was an error updating the post.'));	
		  	} else {
		  		toUpdate = post;
		  		resolve({ slug: toUpdate.slug });
		  	}
		  }, this.delay);
		});			
	}

}