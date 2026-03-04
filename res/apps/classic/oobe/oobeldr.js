var res = ''
var desktopRes = 'apps/classic/desktop/'
var locale = localStorage.getItem('OKNA8_locale')
var localepath = res + 'localization/' + locale + '/'
var currentUser = 'system'

console.log('OOBE is loading')

if (typeof SkipOOBE != 'undefined') {
    Exec('FirstLogonAnim')
    sessionStorage.setItem('OKNA8_firstlogonanim_user', UserToPrepare)
} else {
    setTimeout(() => {
        $('#BootFrame')[0].contentWindow.postMessage('HideBootscreen', '*')
        setTimeout(() => {
            $('.bootscreen').css('display', 'none')
            setTimeout(() => {
                DisplayOOBE()
            }, 2000)
        }, 1000)
    }, 1000)
}

async function DisplayOOBE() {
    Exec('msoobe')
}

async function OOBEFirstLogonAnim(oobewinid) {
    Exec('FirstLogonAnim')
    CloseWindow(oobewinid, 'none')
}

async function OOBE_LoadUser(winid) {
    $('#Window_' + winid).css('z-index', '99999')
    addScript('apps/classic/desktop/desktophtml.js').then(() => {
        LogOn(sessionStorage.getItem('OKNA8_firstlogonanim_user')).then(() => {
            console.log('Preparing completed!')
            sendToWin('WindowFrame_' + winid, 'StartOkna')
        })
    })
}

async function OOBE_FirstLogonAnimToTop(winid) {
    $('#Window_' + winid).css('z-index', '99999')
}

async function OOBE_Finish(winid) {
    CloseWindow(winid, 'none')
}
