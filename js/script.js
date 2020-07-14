//set reusable variables
const joinBtn =  document.querySelector('.join');
const layout =  document.querySelector('.layout-selector');
const addBtn =  document.querySelector('.add');
const removeBtn =  document.querySelector('.remove');
const removeTOCBtn =  document.querySelector('.remove_toc');
const saveBtn =  document.querySelector('.save');
const reloadBtn =  document.querySelector('.reload');
const uppercaseBtn =  document.querySelector('.uppercase');
const lowercaseBtn =  document.querySelector('.lowercase');
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
        output.querySelector('textarea').value = replaceTxt.slice(0, -1); 
    } else {
        output.querySelector('textarea').value = replaceTxt;
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
    output.querySelector('textarea').value = input.querySelector('textarea').value.replace(urlRegex, returnURL);
}
// run when remove href is clicked
const removeAnchors = () => { 
    output.querySelector('textarea').value = input.querySelector('textarea').value.replace(/<a\s+href\="/g, '').replace(/">/g, '').replace(/<\/a>/g, '');
}
// run when save output is clicked
const saveOutput = () => { 
    const text = output.querySelector("textarea").value.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    const blob = new Blob([text], { type: "text/plain"});
    const anchor = document.createElement("a");
    const date = new Date().toLocaleString('en-gb').split(",")[0].split("/").reverse().join("_");
    anchor.download = `ecs_team_tool_output_${date}.txt`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
// run when remove toc is clicked
const removeTOC = () => {
    const returnURL = (url) => {
        url = (/{{/g.test(url) || /}}/g.test(url)) ? url.replace(/{{%%/g,'{{~~').replace(/%%}}/g,'~~}}') : url;
        const newURL = decodeURIComponent(url.split('&click=')[1]);
        return (/{{~~/g.test(newURL) || /~~}}/g.test(newURL) || /{{$/g.test(newURL) || /$}}/g.test(newURL)) ? newURL.replace(/{{~~/g,'%%').replace(/~~}}/g,'%%').replace(/{{$/g,'$').replace(/$}}/g,'$') : newURL;
    }
    output.querySelector('textarea').value = input.querySelector('textarea').value.replace(/https:\/\/www.medtargetsystem.com\/toc.+?(?=")/g, returnURL);
}
// run when more than 1 character is typed in the box
const characterCount = () => {
    const inputLength = input.querySelector('textarea').value.length;
    const characterCountSpan = input.querySelectorAll('span')[1];
    characterCountSpan.innerText = (inputLength > 0) ? `Character Count : ${inputLength}` : '';
}

const uppercase = () =>  output.querySelector('textarea').value = input.querySelector('textarea').value.toUpperCase();

const lowercase = () => output.querySelector('textarea').value = input.querySelector('textarea').value.toLowerCase();

//event listeners
layout.addEventListener('change', changeLayout);
input.querySelector('textarea').addEventListener('keyup', characterCount);
joinBtn.addEventListener('click', join);
addBtn.addEventListener('click', addAnchors);
removeBtn.addEventListener('click', removeAnchors);
uppercaseBtn.addEventListener('click', uppercase);
lowercaseBtn.addEventListener('click', lowercase);
removeTOCBtn.addEventListener('click', removeTOC);
saveBtn.addEventListener('click', saveOutput);
reloadBtn.addEventListener('click', () => location.reload(true));
