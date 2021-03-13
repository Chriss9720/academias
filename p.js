function conf() {
    var d = document.createElement("DIALOG");
    d.setAttribute("ID","d1");
    var txt = document.createElement("label");
    var yes = document.createElement("button");
    var not = document.createElement("button");
    txt.textContent = '¿Seguro que desea eliminar este usuario?';
    yes.innerHTML = "¡Si!";
    not.innerHTML = "No";

    yes.setAttribute("id", "si");
    yes.setAttribute("style","top: 15%;position: absolute;margin-left: 30%;left: 0%; background-color: #08c211;");
    yes.setAttribute("class","button");
    
    not.setAttribute("id", "no");
    not.setAttribute("style","top: 15%;position: absolute;margin-left: 5%;left: 0%; background-color: #cc1010;");
    not.setAttribute("class","button");
    
    d.appendChild(txt);
    d.appendChild(yes);
    d.appendChild(not);

    d.style.height = (window.innerHeight/2) + "px";
    d.style.width = (window.innerWidth/2) + "px";
    document.body.append(d);
    d.showModal();
    
}
conf();
$("#si").click(function() {
  console.log("ok");
});