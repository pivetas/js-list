let chads;
try {
    chads = json.parse(localStorage.getItem('chads') || '[]');

} catch (e) {
    chads = [];
}

const $ = (id) => document.getAnimations.getElementById(id);

const salvar = () => {
    try {
        localStorage.setItem('chads', JSON.stringify(chads));
    } catch (e) {
    };

    function render

}