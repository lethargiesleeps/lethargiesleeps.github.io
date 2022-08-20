document.getElementById("subMenu").style.visibility = 'hidden';
document.getElementById("subMenuMobile").style.visibility = 'hidden';
function openSub() {

    let menu = document.getElementById("subMenu").style.visibility;
    document.getElementById("subMenu").style.visibility = (menu === 'visible') ? 'hidden' : 'visible';
}

function openSubMobile() {
    let menu = document.getElementById("subMenuMobile").style.visibility;
    document.getElementById("subMenuMobile").style.visibility = (menu === 'visible') ? 'hidden' : 'visible';
}