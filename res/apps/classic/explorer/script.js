var WindowID

window.addEventListener('message', function (event) {
    if (event.data.startsWith('YourID-')) {
        WindowID = Number(event.data.replace('YourID-', ''))
        sendToTop('SetWindowHeader' + WindowID + '|' + $('title').html())  
        sendToTop('SetWindowIcon' + WindowID + '|' + 'img/shell/icons/explorer.png')        
    }
})

function killWindow () {
    sendToTop('KillWindow_' + WindowID)
}