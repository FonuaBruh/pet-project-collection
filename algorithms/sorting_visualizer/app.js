let array = [];
const container = document.getElementById("array-container");

function reset() {
    array = Array.from(
        { length: 30 },
        () => Math.floor(Math.random() * 100) + 10
    );

    render();
}

function render() {
    container.innerHTML = "";

    const maxHeight = Math.max(...array);

    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(value / maxHeight) * 100}%`;
        container.appendChild(bar);
    });
}

reset();

async function bubbleSort() {
    const speed = document.getElementById("speed").value;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            const bars = document.querySelectorAll(".bar");
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await new Promise((resolve) => setTimeout(resolve, 1000 / speed));

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                render();
            }

            bars[j].style.backgroundColor = "#6200ea";
            bars[j + 1].style.backgroundColor = "#6200ea";
        }
    }
}

function startBubbleSort() {
    reset();
    setTimeout(bubbleSort, 500);
}

async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) return;

    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);

    const bars = document.querySelectorAll(".bar");
    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = "#4CAF50";
    }
}

async function partition(start, end) {
    const speed = document.getElementById("speed").value;
    const bars = document.querySelectorAll(".bar");
    const pivotValue = array[end];

    bars[end].style.backgroundColor = "#FF9800";

    let pivotIndex = start;
    for (let i = start; i < end; i++) {

        bars[i].style.backgroundColor = "red";

        await new Promise((resolve) => setTimeout(resolve, 1000 / speed));

        if (array[i] < pivotValue) {

            bars[i].style.backgroundColor = "#9C27B0";
            bars[pivotIndex].style.backgroundColor = "#9C27B0";

            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            render();

            await new Promise((resolve) => setTimeout(resolve, 1000 / speed));

            pivotIndex++;
        }

        if (i !== end) bars[i].style.backgroundColor = "#6200EA";
    }

    bars[pivotIndex].style.backgroundColor = "#9C27B0";
    bars[end].style.backgroundColor = "#9C27B0";

    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    render();

    bars[pivotIndex].style.backgroundColor = "#4CAF50";
    bars[end].style.backgroundColor = "#6200EA";

    return pivotIndex;
}

function startQuickSort() {
    reset();
    setTimeout(() => quickSort(), 500);
}
