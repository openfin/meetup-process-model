function freezeParentApp() {
    alert('now we are frozen!');
}

function updateParent() {
    window.opener.document.querySelector('#header-text').innerText = "From child";
}

function crash() {
    let txt = "a";
    while(1){
        txt = txt += "a";
    }
}

document.addEventListener('DOMContentLoaded', () => {
});
