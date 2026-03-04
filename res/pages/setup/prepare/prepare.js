/*$(document).ready(() => {
    setTimeout(function () {
        $('.ring-2').css('display', 'block')
        setTimeout(function () {
            $('#text_under_ring').html(LOCALE_firstboot[3])
            var percent = 3
            setTimeout(() => {
                function disp() {
                    if (percent < 101) {
                        $('#text_under_ring').html(LOCALE_firstboot[3] + ' ' + percent + '%')
                        percent = percent + 3
                        setTimeout(disp, 1000)
                    } else {
                        $('#text_under_ring').html(LOCALE_firstboot[3] + ' 100%')
                        setTimeout(() => {
                            localStorage.setItem('OKNA8_setupState', '3')
                            $('#text_under_ring').html(LOCALE_firstboot[2])
                            setTimeout(() => {
                                $('#text_under_ring').html(LOCALE_firstboot[4])
                                $('.preparingani').css('animation', 'opacityani 1s linear forwards')
                                setTimeout(function () {
                                    window.location.href = '../OOBE/boot.html'
                                }, 1500)
                            }, 7000)
                        }, 300)
                    }
                }
                disp()
            }, 1000)
        }, 14300)
    }, 2000)
})*/
setTimeout(() => {
    document.getElementById('bootscreen').contentWindow.postMessage('DisplayRing', '*')
    setTimeout(() => {
        document.getElementById('bootscreen').contentWindow.postMessage('Boottext|' + LOCALE_firstboot[3], '*')
        let i = 0
        function q() {
            if (i < 99) {
                setTimeout(() => {
                    i = i + 3
                    document.getElementById('bootscreen').contentWindow.postMessage('Boottext|' + LOCALE_firstboot[3] + ' ' + i + '%', '*')
                    q()
                }, Math.random() * 500)
            } else {
                document.getElementById('bootscreen').contentWindow.postMessage('Boottext|' + LOCALE_firstboot[3] + ' 100%', '*')
                setTimeout(() => {
                    document.getElementById('bootscreen').contentWindow.postMessage('Boottext|' + LOCALE_firstboot[2], '*')
                    setTimeout(() => {
                        document.getElementById('bootscreen').contentWindow.postMessage('Boottext| ', '*')
                        localStorage.setItem('OKNA8_setupState', '3')
                        document.getElementById('bootscreen').contentWindow.postMessage('HideBootscreen', '*')
                        setTimeout(function () {
                            window.location.href = '../OOBE/boot.html'
                        }, 1500)
                    }, 5000)
                }, 1000)
            }
        }
        q()
    }, 4000)
}, 1000)