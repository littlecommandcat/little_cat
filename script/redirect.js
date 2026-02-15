const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

const buttons = document.querySelectorAll('#inviteBtn, #inviteBtnBottom');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.add('fade-out-all');
        const overlay = document.createElement('div');
        overlay.className = 'blue-overlay';
        document.body.appendChild(overlay);

        setTimeout(() => {
            window.location.href = "https://discord.com/oauth2/authorize?client_id=1144161789832069141";
        }, 1000);
    });
});