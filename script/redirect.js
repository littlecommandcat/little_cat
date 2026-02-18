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

const invitebuttons = document.querySelectorAll('#inviteBtn, #inviteBtnBottom');
invitebuttons.forEach(btn => {
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

const nyankobutton = document.querySelectorAll('#nyankohost');
nyankobutton.forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.add('fade-out-all');
        const overlay = document.createElement('div');
        overlay.className = 'blue-overlay';
        document.body.appendChild(overlay);

        setTimeout(() => {
            window.location.href = "https://dctw.xyz/servers/1404587685645123665";
        }, 1000);
    });
});