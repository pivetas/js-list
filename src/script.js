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
        card.className = 'flex items-start gap-3 rounded-xl border p-3 sm:gap-4 sm:p-4 ' +
            (topo
                ? 'border-amber-500 bg-amber-950/30'
                : 'border-slate-700 bg-gray-800');

        const rank = document.createElement('div');
        rank.textContent = (pos + 1) + 'º';
        rank.className = 'w-9 shrink-0 text-xl font-extrabold sm:w-10 sm:text-2xl ' + (topo ? 'text-amber-500' : 'opacity-50');

        const info = document.createElement('div');
        info.className = 'min-w-0 flex-1';

        const nome = document.createElement('h3');
        nome.textContent = c.nome;
        nome.className = 'font-semibold break-words';

        const motivo = document.createElement('p');
        motivo.textContent = c.motivo;
        motivo.className = 'mt-1 text-sm opacity-75 break-words md:text-base';

        info.append(nome, motivo);

        const voto = document.createElement('button');
        voto.textContent = 'Votar (' + c.votos + ')';
        voto.className = 'min-h-[44px] shrink-0 touch-manipulation rounded-lg border border-gray-500 px-3 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-600 active:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500';

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