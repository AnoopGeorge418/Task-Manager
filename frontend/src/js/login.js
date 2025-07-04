document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener('submit', async(e) => {
        e.preventDefault(); // stops page reload

        // fetching user input
        const email = document.getElementById("userEmail");
        const password = document.getElementById("userPassword");

        // sending feched data to backend
        try {
            const res = await fetch("");
        } catch (err) {
            console.log(err);
        }

    });
});