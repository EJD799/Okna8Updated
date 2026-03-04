var WindowID

window.addEventListener('message', function (event) {
    if (event.data.startsWith('YourID-')) {
        WindowID = Number(event.data.replace('YourID-', ''))
        sendToTop('SetWindowHeader' + WindowID + '|' + $('title').html())  
        sendToTop('SetWindowIcon' + WindowID + '|' + 'img/shell/icons/run.png')        
    }
})

function killWindow () {
    sendToTop('KillWindow_' + WindowID)
}

setInterval(()=>{
    if ($('input').val() != '') {
        $('#OKbtn').prop('disabled', false)
    } else {
        $('#OKbtn').prop('disabled', true)
    }
},100)

function ExecuteProgram () {
    sendToTop('eval>Exec(\'' + $('input').val() + '\')')
    killWindow()
}

document.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter' && $('input').val() != '') {
        ExecuteProgram()
    }
})

setTimeout(() => {
    $('input')[0].focus()
}, 1)