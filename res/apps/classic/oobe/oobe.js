var WindowID
var LOCALE_winver = []

window.addEventListener('message', function (event) {
    if (event.data.startsWith('YourID-')) {
        WindowID = Number(event.data.replace('YourID-', ''))
    }
})

var colorsB = ['29,29,29', '124,132,133', '141,0,23', '164,0,0', '211,69,0', '235,153,0', '255,179,23', '125,155,52', '65,135,0', '29,81,0', '0,60,0', '68,161,119', '0,141,143', '0,168,169', '0,155,240', '0,104,183', '0,80,155', '9,26,69', '24,0,82', '73,0,144', '86,57,138', '141,55,175', '140,0,90', '171,0,100', '234,0,152']

var colorsF = ['94,94,94', '48,48,48', '190,0,33', '247,52,0', '255,137,43', '255,193,44', '255,201,26', '138,203,0', '109,176,0', '22,153,0', '22,153,0', '88,204,125', '0,209,210', '0,209,210', '64,195,255', '0,142,225', '0,171,255', '0,117,198', '0,117,198', '70,23,180', '104,0,179', '161,59,201', '189,86,229', '192,40,131', '249,0,165']

var userColorB = '24,0,82'
var userColorF = '0,117,198'

function ChangeColor() {
    $('body').css('background-color', 'rgb(' + colorsB[$('.ColorSelectInput').val()] + ')')
    userColorB = colorsB[$('.ColorSelectInput').val()]
    userColorF = colorsF[$('.ColorSelectInput').val()]
}

$(document).ready(() => {
    setTimeout(() => {
        $('#OOBE_Page2').css('display', 'block')
        $('body').css('transition', '0.5s cubic-bezier(0.1, 0.9, 0.2, 1)')
        $('body').css('animation', 'none')
        $('body').css('background-color', 'rgb(' + colorsB[18] + ')')
    }, 2300)
})

function checkInput(id) {
    var yratext = /['\s', '{', '|', '}','~','[','\]','\\','^','\'',':',';','<','=','>','?','!','@','\"','#','$','%','`','(',')','+','\/','.','\,','\*','&']/
    if (yratext.test($(id).val())) {
        $(id).val(
            $(id)
                .val()
                .replace(/[,'\s', '{', '|', '}','~','[','\]','\\','^','\'',':',';','<','=','>','?','!','@','\"','#','$','%','`','(',')','+','\/','.','\,','\*','&']/, '')
        )
    }
}

// Функции отображения страниц

function DisplayPage3() {
    if ($('#InputPcName').val() != '') {
        localStorage.setItem('OKNA8_pcname', $('#InputPcName').val())
        $('#OOBE_Page2').css('animation', 'Page_SectionHideAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
        setTimeout(() => {
            $('#OOBE_Page2').css('display', 'none')
            $('#OOBE_Page2').css('animation', 'Page_SectionAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
        }, 200)
        setTimeout(() => {
            $('#OOBE_Page3').css('display', 'block')
        }, 150)
    }
}

function UseStandartSettings() {
    localStorage.setItem('OKNA8_NetworkDetecting', 'true')
    $('#OOBE_Page3').css('animation', 'Page_SectionHideAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
    setTimeout(() => {
        $('#OOBE_Page3').css('display', 'none')
        $('#OOBE_Page3').css('animation', 'Page_SectionAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
    }, 200)
    setTimeout(() => {
        $('#OOBE_Page4').css('display', 'block')
    }, 150)
}

function EditSettings() {
    $('#OOBE_Page3').css('animation', 'Page_SectionHideAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
    setTimeout(() => {
        $('#OOBE_Page3').css('display', 'none')
        $('#OOBE_Page3').css('animation', 'Page_SectionAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
    }, 200)
    setTimeout(() => {
        $('#OOBE_Page6').css('display', 'block')
    }, 150)
}

function DisplayPage7(networkShare) {
    if (networkShare) {
        localStorage.setItem('OKNA8_NetworkDetecting', 'true')
    } else {
        localStorage.setItem('OKNA8_NetworkDetecting', 'false')
    }
    $('#OOBE_Page6').css('animation', 'Page_SectionHideAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
    setTimeout(() => {
        $('#OOBE_Page6').css('display', 'none')
        $('#OOBE_Page6').css('animation', 'Page_SectionAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
    }, 200)
    setTimeout(() => {
        $('#OOBE_Page7').css('display', 'block')
    }, 150)
}

function FinishOOBE() {
    if ($('#InputUsername').val() != '' && $('#InputPassword').val() == $('#InputPasswordRetry').val()) {
        localStorage.setItem('OKNA8_users', 'user0')
        localStorage.setItem('OKNA8_user_user0_username', $('#InputUsername').val())
        localStorage.setItem('OKNA8_user_user0_password', $('#InputPassword').val())
        localStorage.setItem('OKNA8_user_user0_color_background', userColorB)
        localStorage.setItem('OKNA8_user_user0_color_foreground', userColorF)
        sessionStorage.setItem('OKNA8_firstlogonanim_user', 'user0')
        $('#OOBE_Page4').css('animation', 'Page_SectionHideAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
        setTimeout(() => {
            $('#OOBE_Page4').css('display', 'none')
            $('#OOBE_Page4').css('animation', 'Page_SectionAni 0.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
        }, 200)
        setTimeout(() => {
            $('#OOBE_Page5').css('display', 'block')
            setTimeout(() => {
                $('body').css('background-color', 'black')
                $('#OOBE_Page5').css('animation', 'fadeani 0.5s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
                localStorage.setItem('OKNA8_setupState', '1')
                setTimeout(() => {
                    sendToTop('eval>OOBEFirstLogonAnim(' + WindowID +')')
                }, 1000)
            }, 4000)
        }, 150)
    }
}

addScript('../../../localization/' + localStorage.getItem('OKNA8_locale') + '/oobe.js').then(() => {
    addScript('localization.js')
})
