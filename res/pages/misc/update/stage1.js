$('body').css('background-color', 'rgb(' + localStorage.getItem('OKNA8_user_' + currentUser + '_color_background') + ')')

$(document).ready(() => {
    $('#update').html(LOCALE_shutdown[7])
    var { ipcRenderer } = require('electron')
    setTimeout(() => {
        ipcRenderer.send('StartUpdate')
    }, 5000)
    ipcRenderer.on('UpdateFinish', () => {
        $('#update').html(LOCALE_shutdown[2])
    })
})