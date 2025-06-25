  document.addEventListener("DOMContentLoaded", function () {
            const popup = document.getElementById("popup");
            const popupImg = document.getElementById("popup-img");
            const popupTitle = document.getElementById("popup-title");
            const popupDesc = document.getElementById("popup-desc");
            const closePopup = document.getElementById("close-popup");

            // Dropdown functionality
            const dropdownBtn = document.getElementById("dropdownBtn");
            const dropdownMenu = document.getElementById("dropdownMenu");

            dropdownBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                dropdownBtn.classList.toggle("active");
                dropdownMenu.classList.toggle("show");
            });

            // Close dropdown when clicking outside
            document.addEventListener("click", (e) => {
                if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownBtn.classList.remove("active");
                    dropdownMenu.classList.remove("show");
                }
            });

            // Dropdown item navigation
            document.querySelectorAll(".dropdown-item").forEach(item => {
                item.addEventListener("click", () => {
                    const url = item.getAttribute("data-url");
                    if (url) {
                        window.location.href = url;
                    }
                });
            });

            // Product button click handlers
            document.querySelectorAll(".product-button").forEach(button => {
                button.addEventListener("click", () => {
                    const imgSrc = button.getAttribute("data-img");
                    const desc = button.getAttribute("data-desc");
                    const title = button.getAttribute("data-title");

                    popupImg.src = imgSrc;
                    popupImg.alt = title;
                    popupTitle.textContent = title;
                    popupDesc.innerHTML = desc;
                    popup.classList.add("show");
                });
            });

            // Close popup handlers
            closePopup.addEventListener("click", () => {
                popup.classList.remove("show");
            });

            popup.addEventListener("click", (e) => {
                if (e.target === popup) {
                    popup.classList.remove("show");
                }
            });

            // Escape key to close popup and dropdown
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    if (popup.classList.contains("show")) {
                        popup.classList.remove("show");
                    }
                    if (dropdownMenu.classList.contains("show")) {
                        dropdownBtn.classList.remove("active");
                        dropdownMenu.classList.remove("show");
                    }
                }
            });
        });