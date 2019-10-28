;(function() {

	window.onload = function() {
		class ModelPost {
			constructor(key) {
				this.key = key;
			}

			getPosts() {
				return localStorage.getItem(this.key) != null? JSON.parse(localStorage.getItem(this.key)): [];
			}

			addPost(data) {
				let posts = this.getPosts();
				posts.push(data);
				//localStorage.removeItem(this.key);
				localStorage.setItem(this.key, JSON.stringify(posts));
			}
		}

		class ViewPost {
			showPosts(content, data) {
				content.innerHTML = "";
				for(let key in data){
					content.innerHTML += `
					<div class="content__item">
						<div class="content__title">${data[key]['title']}</div>
						<div class="content__desctiption">${data[key]['description']}</div>
					</div>`;
				}
			}

			showPost(content, data) {
				content.innerHTML += `
				<div class="content__item">
					<div class="content__title">${data['title']}</div>
					<div class="content__desctiption">${data['description']}</div>
				</div>`;
			}
		}

		class ControllerPost {
			constructor(model, view) {
				this.model = model;
				this.view = view;
			}

			addPost(data) {
				console.log(this.model.getPosts());
				this.model.addPost(data);
				console.log(this.model.getPosts());
			}

			showPosts(content) {
				this.view.showPosts(content, this.model.getPosts());
			}
		}

		const modal = document.querySelector(".js-modal");
		const create_btn = document.querySelector(".js-create-btn");
		const modal_save = document.querySelector(".js-save-btn");
		const content = document.querySelector(".content");
		const data = [];

		const contrPost = new ControllerPost(new ModelPost("posts"), new ViewPost);
		contrPost.showPosts(content);

		create_btn.addEventListener("click", function(){
			modal.classList.remove("modal_display");
		});
		
		modal.querySelector(".js-cancel-btn").addEventListener("click", function(){
			modal.classList.add("modal_display");
			document.querySelector("#title").value = "";
			document.querySelector("#description").value = "";
		});

		modal_save.addEventListener("click", function(e){
			e.preventDefault();
			contrPost.addPost({
					"title": document.querySelector("#title").value,
					"description": document.querySelector("#description").value
				});
			modal.classList.add("modal_display");
			document.querySelector("#title").value = "";
			document.querySelector("#description").value = "";
			contrPost.showPosts(content);
		});
	}
		
}());