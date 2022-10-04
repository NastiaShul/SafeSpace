window.addEventListener("DOMContentLoaded", () => {

	// UPD index
	function updatedIndex(numberSelector, parentSelector) {
		let number = document.querySelector(numberSelector),
			block = document.querySelector(parentSelector),
			scrollToTop = block.getBoundingClientRect().top,
			start = +number.innerHTML, end = +number.dataset.max;

		window.addEventListener('scroll', function onScroll() {
			if (window.pageYOffset > scrollToTop - window.innerHeight / 2) {
				this.removeEventListener('scroll', onScroll);
				let interval = setInterval(function () {
					number.innerHTML = ++start;
					if (start == end) {
						clearInterval(interval);
					}
				}, 8);
			}
		});
	}

	updatedIndex('.upd-index', '.statistics');
	updatedIndex('.upd-index2', '.statistics');
	updatedIndex('.upd-index3', '.statistics');
	updatedIndex('.upd-index4', '.statistics');
	updatedIndex('.upd-index5', '.jorney-days__block');
	updatedIndex('.upd-index6', '.kilometers__sub');

	// form 

	const form = document.querySelector("form");

	const message = {
		loading: "Loading...",
		success: "Great! Please, check your email",
		failure: "Something went wrong...",
	};

	bindPostData(form);

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessage = document.createElement("div");
			statusMessage.style.cssText = `
		justify-content: center;
		text-align: center;
		margin: 15px 0 0 0;
		color: #FC4E11;
		text-transform: uppercase;
		`;
			statusMessage.textContent = message.loading;
			form.insertAdjacentElement("afterend", statusMessage);


			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			fetch("server.php", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: json,
			}).then(data => {
				console.log(data);
				statusMessage.textContent = message.success;
				setTimeout(() => {
					statusMessage.remove();
				}, 4000);
			}).catch(() => {
				statusMessage.textContent = message.failure;
			})
				.finally(() => {
					form.reset();
				})

		});
	}


});

