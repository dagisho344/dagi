document.addEventListener("DOMContentLoaded", () => {
	document.body.classList.add("js-enabled");
	const menuButton = document.getElementById("menu-toggle");
	const navList = document.querySelector(".site-nav ul");
	const darkButton = document.getElementById("dark-mode");
	const filterButtons = document.querySelectorAll(".filter-btn");
	const projectCards = document.querySelectorAll(".project-card[data-category], .certificate-card[data-category]");
	const revealItems = document.querySelectorAll(".reveal");

	if (localStorage.getItem("theme") === "dark") {
		document.body.classList.add("dark-mode");
	}

	menuButton?.addEventListener("click", () => {
		navList?.classList.toggle("active");
	});

	darkButton?.addEventListener("click", () => {
		document.body.classList.toggle("dark-mode");
		localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
	});

	filterButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const filter = button.dataset.filter;
			filterButtons.forEach((item) => item.classList.remove("active"));
			button.classList.add("active");

			projectCards.forEach((card) => {
				card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
			});
		});
	});

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
			}
		});
	}, { threshold: 0.15 });

	revealItems.forEach((item) => observer.observe(item));
});


