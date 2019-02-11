const feedURL = 'http://www.kstw.de/KStW/RSS/rssSPP.php?id=2'

const request = new XMLHttpRequest()
request.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=' + feedURL, true)

request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText)
        let content = data.items[0].content
        if (content.includes('Himmel')) {
            happyYes()
        } else {
            sadlyNo()
            todaysMenu(content)
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

const todaysMenu = (content) => {
    const parser = new DOMParser()
    const todaysMenuOutput = document.querySelector('#todays-menu')
    todaysMenuOutput.style.visibility = 'visible' 

    let parsedContent = parser.parseFromString(content, 'text/html')
    let foods = parsedContent.body.querySelectorAll('.artikel')

    foods.forEach(element => {
        let node = document.createElement('li') // <li> Node erstellen         
        let textnode = document.createTextNode(element.firstChild.nodeValue) // Textnode mit einem foods element befüllen     
        node.appendChild(textnode) // Textnode an Node anfügen
        document.querySelector('#todays-menu ul').appendChild(node) // <li> mit an DOM-Element anfuegen
    })
}
