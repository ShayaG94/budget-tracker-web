document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("categorySelect");
    const otherGroup = document.getElementById("newCategoryContainer");

    select.addEventListener("change", () => {
        if (select.value === "other") {
            otherGroup.style.display = "block";
            document.getElementById("newCategory").setAttribute("required", true);
        } else {
            otherGroup.style.display = "none";
            document.getElementById("newCategory").removeAttribute("required");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const nobSelect = document.getElementById("nobSelect");
    const newNobContainer = document.getElementById("newNobContainer");
    const newNobInput = document.getElementById("newNob");

    nobSelect.addEventListener("change", () => {
        if (nobSelect.value === "other") {
            newNobContainer.style.display = "block";
            newNobInput.setAttribute("required", "required");
        } else {
            newNobContainer.style.display = "none";
            newNobInput.removeAttribute("required");
        }
    });
});
