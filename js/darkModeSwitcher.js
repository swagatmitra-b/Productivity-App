const body = document.querySelector("body");
const buttonMode = document.querySelector("button.color-mode");
let theme = localStorage.getItem("theme");

// Função para definir o tema com base no localStorage
function setTheme() {
	if (theme === "dark") {
		body.classList.add("bg-dark-mode");
		body.classList.add("dark-mode");
		buttonMode.innerHTML = '<i class="ph ph-sun"></i>';
	} else {
		body.classList.remove("bg-dark-mode");
		body.classList.remove("dark-mode");
		buttonMode.innerHTML = '<i class="ph ph-moon"></i>';
	}
}
// Chame a função para configurar o tema inicial
setTheme();

buttonMode.onclick = () => {
	theme = theme === "light" ? "dark" : "light";
	localStorage.setItem("theme", theme);
	setTheme();
};
