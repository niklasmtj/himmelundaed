const feedURL = 'http://www.kstw.de/KStW/RSS/rssSPP.php?id=2'

const request = new XMLHttpRequest()
request.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=' + feedURL, true)

request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText).items[0]
        const content = data.content, description = data.description;
        if (content.includes('Himmel')) {
            happyYes()
        } else {
            sadlyNo()
            todaysMenu(content, description)
        }
    } else {
        errorOutput()
    }
}

request.onerror = () => {
    errorOutput()
}

request.send()

const output = document.querySelector('#output')

const errorOutput = () => output.innerHTML = '<p>Kann ich dir leider nicht genau sagen <div id="emoji">😕</div></p>'
const sadlyNo = () => output.innerHTML = '<p>Leider nein! <div id="emoji">😢</div></p>'
const happyYes = () => output.innerHTML = '<p>Heute gibts es Himmel und Äd! <div id="emoji">😀</div></p>'

const todaysMenu = (content, description) => {
    const parser = new DOMParser()
    const todaysMenuOutput = document.querySelector('#todays-menu')
    todaysMenuOutput.style.visibility = 'visible' 

    const parsedContent = parser.parseFromString(content, 'text/html')
    const foods = parsedContent.body.querySelectorAll('.artikel')
    if (content !== description){
        foods.forEach(element => {
            const node = document.createElement('li') // <li> Node erstellen         
            const textnode = document.createTextNode(element.firstChild.nodeValue) // Textnode mit einem foods element befüllen     
            node.appendChild(textnode) // Textnode an Node anfügen
            document.querySelector('#todays-menu ul').appendChild(node) // <li> mit an DOM-Element anfuegen
        })
    } else {
        const todaysMenu = document.querySelector("#todays-menu");
        todaysMenu.style.display = "none";
        return sadlyNo();
    }
    
}
