export function initlizeTheme() {

    const indicator = document.getElementById("theme-sign");
    let themeSwitch = document.getElementById("theme-input");

    const basepath = window.location.pathname.includes("pages") ? "../assets/img" : "./assets/img";

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        indicator.setAttribute("src", `${basepath}/temaClaro.png`);
        document.body.classList.add("dark-theme");
        themeSwitch.checked = true;

    } else {

        indicator.setAttribute("src", `${basepath}/temaOscuro.png`);

    }

    themeSwitch.addEventListener("change", () => {        

        if (themeSwitch.checked) {

            indicator.setAttribute("src", `${basepath}/temaClaro.png`);
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");

        } else {

            indicator.setAttribute("src", `${basepath}/temaOscuro.png`);
            document.body.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");

        }
    });

}