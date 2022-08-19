document.getElementById("subMenu").style.visibility = 'hidden';

function openSub() {

    let menu = document.getElementById("subMenu").style.visibility;
    document.getElementById("subMenu").style.visibility = (menu === 'visible') ? 'hidden' : 'visible';
}