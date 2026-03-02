async function loadEvents() {
    const response = await fetch("events.json");
    const data = await response.json();

    const list = document.getElementById("event-list");

    if (list) {
        data.events.forEach(event => {
            const link = document.createElement("a");
            link.href = "event.html?id=" + event.id;
            link.textContent = event.title;
            list.appendChild(link);
        });
    }

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id");

    if (eventId) {
        const event = data.events.find(e => e.id === eventId);
        const slideshow = document.getElementById("slideshow");

        event.images.forEach((img, index) => {
            const div = document.createElement("div");
            div.classList.add("slide");
            div.style.backgroundImage = `url(${img})`;
            div.style.animationDelay = `${index * 5}s`;
            slideshow.appendChild(div);
        });
    }
}

loadEvents();
