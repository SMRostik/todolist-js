;(function() {

	window.onload = function() {
		class ToolPanelElement{
			//this.current_option;
			constructor(context, id, options){
				this.sel = document.querySelector(id);
				this.options = options;
				this.current_option = this._getFirstOptionKey();

				this.context = context;
				this.display();
			}

			_addEventBtn(){
				this.sel.querySelector(".select__body").classList.toggle("select__body_active");
			}

			_addEventBody(e){
				this.sel.querySelector(".select__btn").setAttribute("data-value", e.target.getAttribute('data-value'));
				//let txt = e.target.textContent || e.target.innerText;
				this.sel.querySelector(".select__btn").innerHTML = e.target.textContent || e.target.innerText;//txt;
				this.sel.querySelector(".select__body").classList.toggle("select__body_active");
				//this._filter(e.target.getAttribute('data-value'));
				this._selectElem();
			}
			_filter(value){}
			_selectElem(){
				this.context.showPosts();
			}
			_getFirstOptionKey(){
				for(let i in this.options)
					return i;
			}
			getNameOption(id){
				return this.options[id];
			}
			display(){
				this.sel.innerHTML = `<button data-value="${this._getFirstOptionKey()}" class="select__btn">${this.getNameOption(this._getFirstOptionKey())}</button>`;
				let body = `<ul class="select__body">`;
				for(let key in this.options){
					body += `
					<li data-value="${key}" class="select__item">${this.options[key]}</li>`;
				}
				body += `</ul>`;
				this.sel.innerHTML += body;

				this._addEventBtn = this._addEventBtn.bind(this);
				this._addEventBody = this._addEventBody.bind(this);
				this.sel.querySelector(".select__btn").addEventListener("click", this._addEventBtn);
				this.sel.querySelector(".select__body").addEventListener("click", this._addEventBody);
			}
		}

		class ToolPanelElementWork extends ToolPanelElement{
			constructor(id, controller){
				super(id);
				this.contrl = controller;
			}
			_filter(value){
				console.log(value);
			}
		}

		class ModelPost {
			constructor(key) {
				this.key = key;
				//localStorage.removeItem(key);
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
				console.log("addPost");
				localStorage.setItem(this.key, JSON.stringify(posts));
			}
			getPriorityName(id){
				switch (+id) {
					case 1:
						return "Higt";
					case 2:
						return "Normal";
					case 3:
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
				this.content = document.querySelector(".content");

				this.modal_select = new ToolPanelElement(this, "#modal_select", {0: "All1", 1: "High", 2: "Normal", 3: "Low"});
				this.status_work = new ToolPanelElement(this, "#status_work", {0: "All2", 1: "Open", 2: "Done"});
				this.status_priority = new ToolPanelElement(this, "#status_priority", {0: "All3", 1: "High", 2: "Normal", 3: "Low"});
			}

			addPost(data) {
				console.log(this.model.getPosts());
				this.model.addPost(data);
				console.log(this.model.getPosts());
			}

			showPosts() {
				let data = this.model.getPosts();
				console.log(data);
				let newData = [];
				for(let key in data){
					console.log(data[key]);
					if(!this.status_work.current_option 
						|| !this.status_priority.current_option 
						|| data[key]["done_status"] == this.status_work.current_option 
						|| data[key]["priority"] == this.status_priority.current_option){
						newData[key] = data[key];
					}
				}
				console.log(newData);
				this.view.showPosts(this.content, newData);
			}
		}

		const modal = document.querySelector(".js-modal");
		const create_btn = document.querySelector(".js-create-btn");
		const modal_save = document.querySelector(".js-save-btn");
		
		const data = [];

		const contrPost = new ControllerPost(new ModelPost("posts"), new ViewPost);
		contrPost.showPosts();

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
			console.log("ms el");
			contrPost.addPost({
					"title": document.querySelector("#title").value,
					"description": document.querySelector("#description").value,
					"priority": document.querySelector("#modal_select .select__btn").getAttribute('data-value'),
					"done_status": 1
				});
			modal.classList.add("modal_display");
			document.querySelector("#title").value = "";
			document.querySelector("#description").value = "";
			contrPost.showPosts();
		});


		

		// new ToolPanelElement("#modal_select", {0: "All1", 1: "High", 2: "Normal", 3: "Low"}).display();
		// new ToolPanelElement("#status_work", {0: "All2", 1: "Open", 2: "Done"}).display();
		// new ToolPanelElement("#status_priority", {0: "All3", 1: "High", 2: "Normal", 3: "Low"}).display();
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