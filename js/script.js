//set reusable variables
const joinBtn =  document.querySelector('.join');
const layout =  document.querySelector('.layout-selector');
const addBtn =  document.querySelector('.add');
const removeBtn =  document.querySelector('.remove');
const saveBtn =  document.querySelector('.save');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const urlRegex = /(https?:\/\/[^\s]+)/g;

// run when join button is clicked
const join = () => {
    const delimiter = document.querySelector('#delimiter').value;
    const text = input.querySelector('textarea').value;
    //replace line feed with delimiter
    const replaceTxt = text.replace(/[\n\t\r\s]+/g, delimiter);
    //if the end of replacetxt matches the delimiter remove the last character
    if (replaceTxt.endsWith(delimiter)) {
        output.querySelector('textarea').innerHTML = replaceTxt.slice(0, -1); 
    } else {
        output.querySelector('textarea').innerHTML = replaceTxt;
    } 
}
// run when layout is changed
const changeLayout = () => {
    const layoutSelected = (event.target.options[event.target.selectedIndex].value === 'STACKED') ? 'stacked' : 'sidebyside';
    input.className = `input-${layoutSelected}`;
    output.className = `output-${layoutSelected}`;
}
// run when add href is clicked
const addAnchors = () => {
    const returnURL = (url) => '<a href="' + url + '">'+ '</a>';
    output.querySelector('textarea').innerHTML = input.querySelector('textarea').value.replace(urlRegex, returnURL);
}
// run when remove href is clicked
const removeAnchors = () => { 
    output.querySelector('textarea').innerHTML = input.querySelector('textarea').value.replace(/<a\s+href\="/g, '').replace(/">/g, '').replace(/<\/a>/g, '');
}
// run when save output is clicked
const saveOutput = () => { 
    const text = output.querySelector("textarea").value.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    const blob = new Blob([text], { type: "text/plain"});
    const anchor = document.createElement("a");
    const date = new Date().toJSON().slice(0,10).split('-').join('/');
    anchor.download = `ecs_team_tool_output_${date}.txt`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

//event listeners
layout.addEventListener('change', changeLayout);
joinBtn.addEventListener('click', join);
addBtn.addEventListener('click', addAnchors);
removeBtn.addEventListener('click', removeAnchors);
saveBtn.addEventListener('click', saveOutput);
