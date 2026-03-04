if (typeof LOCALE_nodegui == "undefined") {
    window.location.reload(true)
}

$(document).ready(()=>{
    ipcRenderer.send('SetLocale', localStorage.getItem('OKNA8_locale'))
    $('.fullscreenWarning > .contents > h1').html(LOCALE_nodegui[1])
    $('.fullscreenWarning > .contents > p').html(LOCALE_nodegui[2])
    $('.fullscreenWarning > .contents > button').html(LOCALE_nodegui[3])
    $('#MenuBar-File').html(LOCALE_nodegui[4])
    $('#MenuBar-View').html(LOCALE_nodegui[5])
    $('#MenuBar-Help').html(LOCALE_nodegui[6])
})