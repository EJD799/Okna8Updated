$(document).ready(() => {
    var user = sessionStorage.getItem('OKNA8_firstlogonanim_user')
    $('.starting').css('background-color', 'rgb(' + localStorage.getItem('OKNA8_user_' + user + '_color_background') + ')')
    localStorage.setItem('OKNA8_user_' + user + '_desktopWallpaper', 'img0')
    localStorage.setItem('OKNA8_lockscreenWallpaper', 'img100')
    localStorage.setItem('OKNA8_user_' + user + '_startScreen-layout', '92metrotile, wide, 2, rgb(1,111,193), rgb(0,141,211), Mail, rgb(1,111,193), ../../metro/Mail, |metrotile, wide, 14, rgb(81,51,171), rgb(100,62,191), Sports, rgb(81,51,171), ../../metro/Sports, |metrotile, standart, 10, rgb(210,71,38), rgb(220,87,46), People, rgb(210,71,38), ../../metro/People, |metrotile, standart, 13, rgb(0,175,240), rgb(26,200,243), Skype, rgb(0,175,240), ../../metro/Skype, |desktoptile, wide, 6|metrotile, wide, 12, rgb(81,51,171), rgb(100,62,191), Calendar, rgb(81,51,171), ../../metro/Calendar, , 2|metrotile, wide, 15, rgb(0,138,0), rgb(0,166,0), Money, rgb(0,138,0), ../../metro/Money, |metrotile, large, 11, rgb(38,114,236), rgb(46,141,239), Weather, rgb(38,114,236), ../../metro/Weather, |metrotile, standart, 5, rgb(38,114,236), rgb(46,141,239), InternetExplorer, rgb(38,114,236), ../../metro/InternetExplorer, |metrotile, standart, 4, rgb(210,71,38), rgb(220,86,46), Music, rgb(210,71,38), ../../metro/Music, |metrotile, wide, 7, rgb(172,25,61), rgb(191,30,75), Changelog, rgb(172,25,61), ../../metro/Changelog, , 2|metrotile, standart, 1, rgb(81,51,171), rgb(100,62,191), Settings, rgb(81,51,171), ../../metro/Settings, , 0|metrotile, standart, 16, rgb(0,130,153), rgb(0,160,177), Photos, rgb(0,130,153), ../../metro/Photos, , 0|metrotile, large, 9, rgb(0,138,0), rgb(0,166,0), Store, rgb(0,138,0), ../../metro/Store, , 0')
    localStorage.setItem('OKNA8_user_' + user + '_StartScreenBackground', '22000')
    if (localStorage.getItem('OKNA8_user_' + user + '_color_foreground') == null) {
        localStorage.setItem('OKNA8_user_' + user + '_color_foreground', '70,23,180')
    }

    function startBackgroundcolor() {
        function changecolors() {
            $('body').css('background-color', 'rgb(0,118,6)')
            setTimeout(() => {
                $('body').css('background-color', 'rgb(0,114,159)')
                setTimeout(() => {
                    $('body').css('background-color', 'rgb(80,74,199)')
                    setTimeout(() => {
                        $('body').css('background-color', 'rgb(181,39,70)')
                        setTimeout(() => {
                            $('body').css('background-color', 'rgb(215,150,69)')
                        }, 5000)
                    }, 5000)
                }, 5000)
            }, 5000)
        }
        changecolors()
        setInterval(changecolors, 25000)
    }
    function startokna() {
        $('.startingtext').html(LOCALE_preparingtext[3])
        $('.starting').css('opacity', '1')
        setTimeout(() => {
            sendToTop('eval>OOBE_Finish(' + WindowID + ')')
        }, 5000)
    }
    $('.centraltext').html(LOCALE_preparingtext[1])
    $('.centraltext').css('opacity', '1')
    setTimeout(() => {
        $('.centraltext').css('opacity', '0')
        setTimeout(() => {
            $('.centraltext').html(LOCALE_preparingtext[2])
            $('.centraltext').css('opacity', '1')
            setTimeout(() => {
                $('.centraltext').css('opacity', '0')
                setTimeout(() => {
                    $('.centraltext').html(LOCALE_preparingtext[5])
                    $('.bottomtext').html(LOCALE_preparingtext[9])
                    $('.centraltext').css('opacity', '1')
                    $('.bottomtext').css('opacity', '1')
                    startBackgroundcolor()
                }, 1000)
            }, 4000)
        }, 1000)
    }, 4000)

    setTimeout(() => {
        localStorage.setItem('OKNA8_LoginToUserAfterPrepare', user)
        sendToTop('eval>OOBE_LoadUser(' + WindowID + ')')
        localStorage.setItem('OKNA8_user_' + user + '_FirstLogonCompleted', 'true')
    }, 15000)
    window.addEventListener('message', (event) => {
        if (event.data == 'StartOkna') {
            startokna()
        }
    })
})
