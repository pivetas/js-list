let chads;
try {
    chads = JSON.parse(localStorage.getItem('chads') || '[]');
} catch (e) {
    chads = [];
}

const $ = (id) => document.getElementById(id);

const salvar = () => {
    try {
        localStorage.setItem('chads', JSON.stringify(chads));
    } catch (e) { }
};

function render() {
    const box = $('ranking');
    box.innerHTML = '';

    [...chads].sort((a, b) => b.votos - a.votos).forEach((c, pos) => {
        const topo = pos === 0;

        const card = document.createElement('article');
        card.className = 'flex items-start gap-4 rounded-xl border p-4 ' +
            (topo
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30'
                : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800');

        const rank = document.createElement('div');
        rank.textContent = (pos + 1) + 'º';
        rank.className = 'w-10 shrink-0 text-2xl font-extrabold ' + (topo ? 'text-amber-600' : 'opacity-50');

        const info = document.createElement('div');
        info.className = 'min-w-0 flex-1';

        const nome = document.createElement('h3');
        nome.textContent = c.nome;
        nome.className = 'font-semibold break-words';

        const motivo = document.createElement('p');
        motivo.textContent = c.motivo;
        motivo.className = 'mt-1 text-sm opacity-75 break-words';

        info.append(nome, motivo);

        const voto = document.createElement('button');
        voto.textContent = 'Votar (' + c.votos + ')';
        voto.className = 'shrink-0 rounded-lg border border-indigo-700 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-indigo-400 dark:text-indigo-300';

        voto.onclick = () => {
            c.votos++;
            salvar();
            render();
        };

        card.append(rank, info, voto);
        box.appendChild(card);
    });

    $('vazio').classList.toggle('hidden', chads.length > 0);
}

$('add').onclick = () => {
    const nome = $('nome').value.trim();
    const motivo = $('motivo').value.trim();

    $('erro').classList.toggle('hidden', !!(nome && motivo));

    if (!nome || !motivo) return;

    chads.push({ nome, motivo, votos: 0 });

    $('nome').value = '';
    $('motivo').value = '';

    salvar();
    render();
};

render();