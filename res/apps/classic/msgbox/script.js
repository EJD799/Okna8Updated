var WindowID

window.addEventListener('message', function (event) {
    if (event.data.startsWith('YourID-')) {
        WindowID = Number(event.data.replace('YourID-', ''))
        sendToTop('SetWindowIcon' + WindowID + '|' + 'img/shell/icons/run.png')        
    } else if (event.data.startsWith('Arguments-')) {
        if (event.data.substring(10).split(' ')[0] != '') {
            var MsgboxArguments = JSON.parse(event.data.substring(10))
            $('.msgboxContent').html(MsgboxArguments['text'])
            sendToTop('SetWindowHeader' + WindowID + '|' + MsgboxArguments['title']) 
            sendToTop(`eval>
                \$("#Window_${WindowID}").css("width", "464px")
                \$("#Window_${WindowID}").css("height", "${$('body')[0].clientHeight + 107}px")
            `) 
            console.log($('body')[0].clientHeight + ' ' + $('body')[0].clientWidth)
        }
    }
})

function killWindow () {
    sendToTop('KillWindow_' + WindowID)
}