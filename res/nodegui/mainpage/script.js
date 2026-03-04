var { ipcRenderer } = require('electron')

ipcRenderer.on('maximize', () => {
    $('body').addClass('maximized')
    $('.maximize').css('display', 'none')
    $('.restore').css('display', 'block')
})

ipcRenderer.on('restore', () => {
    $('body').removeClass('maximized')
    $('.maximize').css('display', 'block')
    $('.restore').css('display', 'none')
})

var fullscreenWarningState = 0

ipcRenderer.on('fullscreen', () => {
    $('body').addClass('fullscreen')
    if (localStorage.getItem('OKNA8NODE_fullscreenWarningDisable') != 'true') {
        $('.fullscreenWarning').css('display', 'block')
        fullscreenWarningState = 1
    }
})

ipcRenderer.on('exitFullscreen', () => {
    $('body').removeClass('fullscreen')
    if (fullscreenWarningState == 1) {
        HideFullscreenWarning()
    }
})

function HideFullscreenWarning() {
    fullscreenWarningState = 0
    $('.fullscreenWarning').css('animation', 'fullscreenwarninghide 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
    localStorage.setItem('OKNA8NODE_fullscreenWarningDisable', 'true')
    setTimeout(() => {
        $('.fullscreenWarning').css('display', 'none')
    }, 200)
}

window.addEventListener('message', (event) => {
    $('#iframe')[0].contentWindow.postMessage(event.data)
})

ipcRenderer.on('MusicUpdate', (event, data) => {
    var paths = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].endsWith('.mp3')) {
            paths.push(data[i])
        }
    }
    paths = paths.join('|')
    $("iframe")[0].contentWindow.postMessage(`eval>
        $("#metrowindow_Music iframe")[0].contentWindow.postMessage("MusicPaths|${paths}", "*")
    `)
})

ipcRenderer.on('PhotosPaths', (event, data)=>{
    $("iframe")[0].contentWindow.postMessage(`eval>
        $("#metrowindow_Photos iframe")[0].contentWindow.postMessage("ListOfFiles|${data.join('|')}", "*")
    `)
})

ipcRenderer.on('PhotosFolder', (event, data)=>{
    $("iframe")[0].contentWindow.postMessage(`eval>
        $("#metrowindow_Photos iframe")[0].contentWindow.postMessage("PhotosFolder|${data.replaceAll('\\', '/')}", "*")
    `)
})

if (localStorage.getItem('OKNA8_locale') == null) {
    window.location.href = "../languageselect/languageselect.html"
} else {
    ConnectScript("../../localization/" + localStorage.getItem("OKNA8_locale") + "/nodegui.js")
    ConnectScript("localization.js")
}

ipcRenderer.on('OknaMods', (event, data)=>{
    $("iframe")[0].contentWindow.postMessage(`eval>
        NodeMods('mods', '${data.join('|')}')
    `)
})

ipcRenderer.on('OknaApps', (event, data)=>{
    $("iframe")[0].contentWindow.postMessage(`eval>
        NodeMods('apps', '${data.join('|')}')
    `)
})