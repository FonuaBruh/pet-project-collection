document.addEventListener("DOMContentLoaded", function () {
    const memePreview = document.getElementById("memePreview");
    const memeImage = document.getElementById("memeImage");
    const topTextElement = document.getElementById("topText");
    const bottomTextElement = document.getElementById("bottomText");
    const templateSelect = document.getElementById("templateSelect");
    const topTextInput = document.getElementById("topTextInput");
    const bottomTextInput = document.getElementById("bottomTextInput");
    const textColor = document.getElementById("textColor");
    const textSize = document.getElementById("textSize");
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    const memeTemplates = [
        {
            id: "181913649",
            name: "Drake Hotline Bling",
            url: "https://i.imgflip.com/30b1gx.jpg",
        },
        {
            id: "87743020",
            name: "Two Buttons",
            url: "https://i.imgflip.com/1g8my4.jpg",
        },
        {
            id: "131087935",
            name: "Running Away Balloon",
            url: "https://i.imgflip.com/261o3j.jpg",
        },
        {
            id: "61579",
            name: "One Does Not Simply",
            url: "https://i.imgflip.com/1bij.jpg",
        },
        {
            id: "102156234",
            name: "Mocking Spongebob",
            url: "https://i.imgflip.com/1otk96.jpg",
        },
    ];

    memeTemplates.forEach((template) => {
        const option = document.createElement("option");
        option.value = template.id;
        option.textContent = template.name;
        option.dataset.url = template.url;
        templateSelect.appendChild(option);
    });

    function updateMemePreview() {
        const templateId = templateSelect.value;
        const topText = topTextInput.value;
        const bottomText = bottomTextInput.value;
        const color = textColor.value;
        const size = textSize.value + "px";

        if (templateId) {
            const selectedOption =
                templateSelect.options[templateSelect.selectedIndex];
            memeImage.src = selectedOption.dataset.url;
            memeImage.style.display = "block";
        } else {
            memeImage.style.display = "none";
        }

        topTextElement.textContent = topText;
        bottomTextElement.textContent = bottomText;

        topTextElement.style.color = color;
        bottomTextElement.style.color = color;

        topTextElement.style.fontSize = size;
        bottomTextElement.style.fontSize = size;

        topTextElement.style.transform = `rotate(${Math.random() * 4 - 2}deg)`;
        bottomTextElement.style.transform = `rotate(${
            Math.random() * 4 - 2
        }deg)`;

        downloadBtn.disabled = !templateId;
    }

    async function generateMeme() {
        const templateId = templateSelect.value;
        const topText = topTextInput.value;
        const bottomText = bottomTextInput.value;

        if (!templateId) {
            alert("Выберите шаблон мема!");
            return;
        }

        try {
            const response = await fetch(
                "https://api.imgflip.com/caption_image",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        template_id: templateId,
                        username: "frizkoks",
                        password: "ZWukCiM48_TNQ2G",
                        text0: topText,
                        text1: bottomText,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                memeImage.src = data.data.url;
                downloadBtn.onclick = () => {
                    const link = document.createElement("a");
                    link.href = data.data.url;
                    link.download = "meme.jpg";
                    link.click();
                };
            } else {
                alert("Ошибка при создании мема: " + data.error_message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при подключении к API");
        }
    }

    templateSelect.addEventListener("change", updateMemePreview);
    topTextInput.addEventListener("input", updateMemePreview);
    bottomTextInput.addEventListener("input", updateMemePreview);
    textColor.addEventListener("input", updateMemePreview);
    textSize.addEventListener("input", updateMemePreview);

    generateBtn.addEventListener("click", generateMeme);

    updateMemePreview();
});
