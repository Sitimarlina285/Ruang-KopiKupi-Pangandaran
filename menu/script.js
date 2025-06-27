document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupTitle = document.getElementById("popup-title");
    const popupDesc = document.getElementById("popup-desc");
    const closePopup = document.getElementById("close-popup");
    const lihatVideo = document.getElementById("lihat-video");
    const popupVideo = document.getElementById("popup-video");
    const popupVideoSource = document.getElementById("popup-video-source");

    // Dropdown functionality
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");

    dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownBtn.classList.toggle("active");
        dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownBtn.classList.remove("active");
            dropdownMenu.classList.remove("show");
        }
    });

    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", () => {
            const url = item.getAttribute("data-url");
            if (url) window.location.href = url;
        });
    });

    // Product popup
    document.querySelectorAll(".product-button").forEach(button => {
        button.addEventListener("click", () => {
            const imgSrc = button.getAttribute("data-img");
            const title = button.getAttribute("data-title");
            const desc = button.getAttribute("data-desc");

            popupImg.src = imgSrc;
            popupImg.alt = title;
            popupTitle.textContent = title;
            popupDesc.innerHTML = desc;

            popup.classList.add("show");

            // Reset: tampilkan semua elemen selain video
            popupImg.style.display = "block";
            popupTitle.style.display = "block";
            popupDesc.style.display = "block";
            lihatVideo.style.display = "block";
            popupVideo.style.display = "none";
            popupVideo.pause();
            popupVideoSource.src = "";
            popupVideo.load();

            // Set video file
            if (title === "Classic Beef Cheeseburger") {
                lihatVideo.dataset.video = "../img/vidio/burger.mp4";
            } else if (title === "French fries") {
                lihatVideo.dataset.video = "../img/vidio/kentang.mp4";
            } else if (title === "Pepperoni and Cheese Pizza") {
                lihatVideo.dataset.video = "../img/vidio/piza.mp4";
            
             } else if (title === "Nasi Goreng Spesial") {
                lihatVideo.dataset.video = "../img/vidio/nasgor.mp4";
            } else if (title === "Katsudon") {
                lihatVideo.dataset.video = "../img/vidio/katsu.mp4";
                } else if (title === "Mie") {
                lihatVideo.dataset.video = "../img/vidio/makanan.mp4";
            } else if (title === "Kwetiau Goreng") {
                lihatVideo.dataset.video = "../img/vidio/makanan.mp4";
                } else if (title === "Nasi Ayam Teriyaki") {
                lihatVideo.dataset.video = "../img/vidio/makanan.mp4";
            } else if (title === "Nasi Ayam Geprek") {
                lihatVideo.dataset.video = "../img/vidio/makanan.mp4";

            } else {
                lihatVideo.dataset.video = "../img/vidio/coffe.mp4";
            }
        });
    });

    closePopup.addEventListener("click", () => {
        popup.classList.remove("show");
        popupVideo.pause();

        // Reset tampilan
        popupImg.style.display = "block";
        popupTitle.style.display = "block";
        popupDesc.style.display = "block";
        lihatVideo.style.display = "block";
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("show");
        }
    });

    lihatVideo.addEventListener("click", function (e) {
        e.preventDefault();
        const videoSrc = this.dataset.video;
        popupVideoSource.src = videoSrc;
        popupVideo.style.display = "block";
        popupVideo.load();
        popupVideo.play();

        // Sembunyikan elemen selain video
        popupImg.style.display = "none";
        popupTitle.style.display = "none";
        popupDesc.style.display = "none";
        lihatVideo.style.display = "none";
    });

    // Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (popup.classList.contains("show")) {
                popup.classList.remove("show");
                popupVideo.pause();
            }
            if (dropdownMenu.classList.contains("show")) {
                dropdownBtn.classList.remove("active");
                dropdownMenu.classList.remove("show");
            }
        }
    });
});
