;(function() {

	window.onload = function() {
		class ModelPost {
			constructor(key) {
				this.key = key;
			}

			getPosts() {
				if(localStorage.getItem(this.key) == null)
					return [];
				let data = JSON.parse(localStorage.getItem(this.key));
				for(let key in data){
					data[key]["priority_text"] = this.getPriorityName(data[key]["priority"]);
				}
				return data;
				//return localStorage.getItem(this.key) != null? JSON.parse(localStorage.getItem(this.key)): [];
			}

			addPost(data) {
				let posts = this.getPosts();
				posts.push(data);
				//localStorage.removeItem(this.key);
				localStorage.setItem(this.key, JSON.stringify(posts));
			}
			getPriorityName(id){
				switch (+id) {
					case 0:
						return "Higt";
					case 1:
						return "Normal";
					case 2:
						return "Low";
					default:
						return "";
				}
			}
		}

		class ViewPost {
			showPosts(content, data) {
				content.innerHTML = "";
				let done_status;
				for(let key in data){
					done_status = data[key]['done_status'] == 1? " content__item_done": "";
					content.innerHTML += `
					<div class="content__item${done_status}">
						<div class="content__title">${data[key]['title']}</div>
						<div class="content__desctiption">${data[key]['description']}</div>
						<div>${data[key]['priority_text']}</div>
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
					"description": document.querySelector("#description").value,
					"priority": document.querySelector("#priority").getAttribute('data-value'),
					"done_status": 0
				});
			modal.classList.add("modal_display");
			document.querySelector("#title").value = "";
			document.querySelector("#description").value = "";
			contrPost.showPosts(content);
		});


		class ToolModal{
			constructor(id){
				this.sel = document.querySelector(id);;

				this._addEventBtn = this._addEventBtn.bind(this);
				this._addEventBody = this._addEventBody.bind(this);
				this.sel.querySelector(".select__btn").addEventListener("click", this._addEventBtn);
				this.sel.querySelector(".select__body").addEventListener("click", this._addEventBody);
			}

			_addEventBtn(){
				this.sel.querySelector(".select__body").classList.toggle("select__body_active");
			}

			_addEventBody(e){
				this.sel.querySelector(".select__btn").setAttribute("data-value", e.target.getAttribute('data-value'));
				let txt = e.target.textContent || e.target.innerText;
				this.sel.querySelector(".select__btn").innerHTML = txt;
				this.sel.querySelector(".select__body").classList.toggle("select__body_active");
				this._filter(e.target.getAttribute('data-value'));
			}
			_filter(value){}
		}

		class ToolModalWork extends ToolModal{
			constructor(id, controller){
				super(id);
				this.contrl = controller;
			}
			_filter(value){
				console.log(value);
			}
		}

		new ToolModal("#modal_select");
		new ToolModalWork("#status_work", contrPost);
		new ToolModal("#status_priority");
		// var sel = document.querySelector("#modal_select");
		// sel.querySelector(".select__btn").addEventListener("click", function(){
		// 	sel.querySelector(".select__body").classList.toggle("select__body_active");
		// });
		// sel.querySelector(".select__body").addEventListener("click", function(e){
		// 	sel.querySelector(".select__btn").setAttribute("data-value", e.target.getAttribute('data-value'));
		// 	var txt = e.target.textContent || e.target.innerText;
		// 	sel.querySelector(".select__btn").innerHTML = txt;
		// 	this.classList.toggle("select__body_active");
		// });

		// var status_work = document.querySelector("#status_work");
		// status_work.querySelector(".select__btn").addEventListener("click", function(){
		// 	status_work.querySelector(".select__body").classList.toggle("select__body_active");
		// });
		// status_work.querySelector(".select__body").addEventListener("click", function(e){
		// 	status_work.querySelector(".select__btn").setAttribute("data-value", e.target.getAttribute('data-value'));
		// 	var txt = e.target.textContent || e.target.innerText;
		// 	status_work.querySelector(".select__btn").innerHTML = txt;
		// 	this.classList.toggle("select__body_active");
		// });

		
		// var status_priority = document.querySelector("#status_priority");
		// status_priority.querySelector(".select__btn").addEventListener("click", function(){
		// 	status_priority.querySelector(".select__body").classList.toggle("select__body_active");
		// });
		// status_priority.querySelector(".select__body").addEventListener("click", function(e){
		// 	status_priority.querySelector(".select__btn").setAttribute("data-value", e.target.getAttribute('data-value'));
		// 	var txt = e.target.textContent || e.target.innerText;
		// 	status_priority.querySelector(".select__btn").innerHTML = txt;
		// 	this.classList.toggle("select__body_active");
		// });
	}
		
}());