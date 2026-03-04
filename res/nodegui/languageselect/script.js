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

$(document).ready(()=>{
    for (let i = 0; i < VERSION.locales.length; i++) {
        $('#LangSelect').append('<option value="' + VERSION.locales[i][0] + '">' + VERSION.locales[i][1] + '</option>')
    }
})

function StartOkna() {
    localStorage.setItem('OKNA8_locale', $('#LangSelect').val())
    window.location.href = "../mainpage/mainpage.html"
}