const form = document.getElementById('loginForm');

form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        if (result.status === "success") {
            window.location.href = '/'; // Redirige a la página de inicio
        }
    } catch (error) {
        console.error('Error:', error);
    }
});