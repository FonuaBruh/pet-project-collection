document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects");

    fetch("projects.json")
        .then((response) => response.json())
        .then((themes) => {
            themes.forEach((themeGroup) => {
                const themeCard = document.createElement("div");
                themeCard.className = "theme-card";

                const themeTitle = document.createElement("h2");
                themeTitle.textContent = themeGroup.theme;
                themeCard.appendChild(themeTitle);

                const projectsList = document.createElement("div");
                projectsList.className = "projects-list";

                themeGroup.projects.forEach((project) => {
                    const projectLink = document.createElement("a");
                    projectLink.href = project.link;
                    projectLink.className = "project-link";
                    projectLink.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        `;
                    projectsList.appendChild(projectLink);
                });

                themeCard.appendChild(projectsList);
                projectsContainer.appendChild(themeCard);
            });
        })
        .catch((error) => {
            console.error("Ошибка загрузки проектов:", error);
            projectsContainer.innerHTML =
                "<p>Не удалось загрузить список проектов.</p>";
        });
});

function adjustCardHeights() {
    const themeCards = document.querySelectorAll(".theme-card");
    let maxHeight = 0;

    themeCards.forEach((card) => {
        card.style.height = "auto";
    });

    themeCards.forEach((card) => {
        const cardHeight = card.getBoundingClientRect().height;
        if (cardHeight > maxHeight) maxHeight = cardHeight;
    });

    themeCards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
    });
}

window.addEventListener("load", adjustCardHeights);
window.addEventListener("resize", adjustCardHeights);
