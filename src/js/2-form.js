const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

function saveToLs(key, values) {
    const parse = JSON.stringify(values);
    localStorage.setItem(key, parse);
}

function getLs(key) {
    const data = localStorage.getItem(key);
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}

function populateForm() {
    const savedData = getLs(STORAGE_KEY);
    if (savedData) {
        if (savedData.email) {
            form.elements.email.value = savedData.email;
        }
        if (savedData.message) {
            form.elements.message.value = savedData.message;
        }
    }
}

form.addEventListener('input', () => {
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    const fotmData = { email, message };

    saveToLs(STORAGE_KEY, fotmData);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.elements.email.value;
    const message = form.elements.message.value;

    if (!email || !message) {
        alert(`Please fill in all fields.`);
        return;
    }

    console.log("fotmData", { email, message });

    form.reset();
    localStorage.removeItem(STORAGE_KEY);
});

populateForm();
