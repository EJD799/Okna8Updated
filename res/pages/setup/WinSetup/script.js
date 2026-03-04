var KEY = "GCRJD8NW9HF2CDXCCM8D9D6T9"

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
  
    elmnt.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
    }

    function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
    }
}

dragElement(document.getElementById("Dialog408"))

function close408 () {
    document.getElementById("Dialog408").style.display = 'none'
    document.getElementById("Dialog408").style.top = 'calc(50vh - 105px)'
    document.getElementById("Dialog408").style.left = 'calc(50vw - 260px)'
}

function display408 () {
    document.getElementById("Dialog408").style.display = 'block'
}

function InstallPage4Checkbox () {
    if (document.getElementById('InstallPage4checkbox').checked) {
        document.getElementById('Page4BtnNext').removeAttribute('disabled')
    } else {
        document.getElementById('Page4BtnNext').toggleAttribute('disabled')
    }
}


var InstallerPages = [
    '',
    '',
    '',
    `
        <h1>${LOCALE_winsetup[4]}</h1>
        <p>${LOCALE_winsetup[5]}</p>
        <p>${LOCALE_winsetup[6]}</p>
        <p>${LOCALE_winsetup[7]}</p>
        <input type="text" maxlength="25">
        <button class="DialogBtn" id="Page3BtnNext" onclick="DisplayInstallGUI(4);ProgressbarChange(1,'65px')">Далее</button>
    `, `
        <h1>${LOCALE_winsetup[8]}</h1> 
        <iframe src="../../../localization/${localStorage.getItem('OKNA8_locale')}/license.html" width="539" height="268" style="margin-top:24px"></iframe>   
        <input type="checkbox" id="InstallPage4checkbox" onchange="InstallPage4Checkbox()">
        <label for="InstallPage4checkbox">${LOCALE_winsetup[9]}</label>
        <button class="DialogBtn" id="Page4BtnNext" disabled onclick="StartInstall()">Далее</button>
    `,`
        <h1>Выберите тип установки</h1>
    `,`
        <h1>Отчёт о совместимости</h1>
    `,`
        <h1>Где вы хотите установить Windows?</h1>
    `,`
        <h1>${LOCALE_winsetup[10]}</h1>
        <p>${LOCALE_winsetup[12]}</p>
        <p style="margin-left:20px;margin-top:30px;margin-bottom:3px;" id="InstallPage8_1"></p>
        <p style="margin-left:20px;margin-top:0;margin-bottom:3px;"    id="InstallPage8_2"></p>
        <p style="margin-left:20px;margin-top:0;margin-bottom:3px;"    id="InstallPage8_3"></p>
        <p style="margin-left:20px;margin-top:0;margin-bottom:3px;"    id="InstallPage8_4"></p>
        <p style="margin-left:20px;margin-top:0;"                      id="InstallPage8_5"></p>
        <img src="img/4149.png" style="position:absolute;top:105px;left:44px;display:none" id="InstallPage8_1img">
        <img src="img/4149.png" style="position:absolute;top:125px;left:44px;display:none" id="InstallPage8_2img">
        <img src="img/4149.png" style="position:absolute;top:145px;left:44px;display:none" id="InstallPage8_3img">
        <img src="img/4149.png" style="position:absolute;top:165px;left:44px;display:none" id="InstallPage8_4img">
        <img src="img/4149.png" style="position:absolute;top:185px;left:44px;display:none" id="InstallPage8_5img">
    `,`
        <h1>${LOCALE_winsetup[19]}</h1>
        <div class="Progressbar9"><div class="ProgressbarFilled"></div></div>
        <p id="Progressbar9timeout">${LOCALE_winsetup[20].replace('000','15')}</p>
        <a style="font-family: 'segoe ui';font-size: 12px;color: rgb(0,102,204);position: absolute;right: 10px;bottom: 20px;" onclick="skipInstallEnd()">${LOCALE_winsetup[21]}</a>
    `
]

function ProgressbarChange (progressbar, width) {
    document.getElementById('Progressbar' + progressbar + 'filled').style.width = width
}

function DisplayInstallGUI (page) {
    if (page == null) {
        document.getElementById('InstallWindowContent').innerHTML = InstallerPages[3]
    } else {
        document.getElementById('InstallWindowContent').innerHTML = InstallerPages[page]
    }
    document.getElementById('InstallGUI').style.display = 'block'
}

ProgressbarChange(1,'24px')

function StartInstall () {
    DisplayInstallGUI(8)
    localStorage.removeItem('OKNA8_setupState')
    ProgressbarChange(1,'204px')
    document.getElementById('InstallPage8_1').style.fontWeight = '600'
    document.getElementById('InstallPage8_2').style.color = 'grey'
    document.getElementById('InstallPage8_3').style.color = 'grey'
    document.getElementById('InstallPage8_4').style.color = 'grey'
    document.getElementById('InstallPage8_5').style.color = 'grey'
    document.getElementById('InstallPage8_1').innerHTML = LOCALE_winsetup[13]
    document.getElementById('InstallPage8_2').innerHTML = LOCALE_winsetup[14]
    document.getElementById('InstallPage8_3').innerHTML = LOCALE_winsetup[15]
    document.getElementById('InstallPage8_4').innerHTML = LOCALE_winsetup[16]
    document.getElementById('InstallPage8_5').innerHTML = LOCALE_winsetup[17]
    setTimeout(() => {
        document.getElementById('InstallPage8_1').innerHTML = LOCALE_winsetup[13] + LOCALE_winsetup[18].replace('000','0')
        setTimeout(() => {
            document.getElementById('InstallPage8_1').innerHTML = LOCALE_winsetup[13] + LOCALE_winsetup[18].replace('000','100')
            ProgressbarChange(2,'60px')
            setTimeout(() => {
                document.getElementById('InstallPage8_1').innerHTML = LOCALE_winsetup[13] 
                document.getElementById('InstallPage8_1').style.fontWeight = '500'
                document.getElementById('InstallPage8_1').style.color = 'grey'
                document.getElementById('InstallPage8_1img').style.display = 'block'
                document.getElementById('InstallPage8_2').style.fontWeight = '600'
                document.getElementById('InstallPage8_2').style.color = 'black'
                document.getElementById('InstallPage8_2').innerHTML = LOCALE_winsetup[13] + LOCALE_winsetup[18].replace('000','0')
                let percent = 0
                var InstallPercentInterval = setInterval(()=>{
                    if (percent != 100) {
                        percent++
                        document.getElementById('InstallPage8_2').innerHTML = LOCALE_winsetup[14] + LOCALE_winsetup[18].replace('000',percent)
                        ProgressbarChange(2,60 + percent * 2 + "px")
                    } else {
                        clearInterval(InstallPercentInterval)
                        setTimeout(() => {
                            document.getElementById('InstallPage8_2').innerHTML = LOCALE_winsetup[14] 
                            document.getElementById('InstallPage8_2').style.fontWeight = '500'
                            document.getElementById('InstallPage8_2').style.color = 'grey'
                            document.getElementById('InstallPage8_2img').style.display = 'block'
                            document.getElementById('InstallPage8_3').style.fontWeight = '600'
                            document.getElementById('InstallPage8_3').style.color = 'black'
                            document.getElementById('InstallPage8_3').innerHTML = LOCALE_winsetup[15]
                            localStorage.setItem('OKNA8_setupState','2')
                            setTimeout(() => {
                                document.getElementById('InstallPage8_3').innerHTML = LOCALE_winsetup[15] 
                                document.getElementById('InstallPage8_3').style.fontWeight = '500'
                                document.getElementById('InstallPage8_3').style.color = 'grey'
                                document.getElementById('InstallPage8_3img').style.display = 'block'
                                document.getElementById('InstallPage8_4').style.fontWeight = '600'
                                document.getElementById('InstallPage8_4').style.color = 'black'
                                document.getElementById('InstallPage8_4').innerHTML = LOCALE_winsetup[16]
                                ProgressbarChange(2,'320px')
                                setTimeout(() => {
                                    document.getElementById('InstallPage8_4').innerHTML = LOCALE_winsetup[16] 
                                    document.getElementById('InstallPage8_4').style.fontWeight = '500'
                                    document.getElementById('InstallPage8_4').style.color = 'grey'
                                    document.getElementById('InstallPage8_4img').style.display = 'block'
                                    ProgressbarChange(2,'380px')
                                    setTimeout(() => {
                                        InstallEnd()
                                    }, 2000)
                                }, 2000)
                            }, 2000)
                        }, 1000)
                    }
                },10)
            }, 2000)
        }, 5000)
    }, 1000)
}

var secondsInterval

function InstallEnd () {
    DisplayInstallGUI(9)
    document.getElementById('InstallWindowClose').toggleAttribute('disabled')
    let seconds = 14
    secondsInterval = setInterval(()=>{
        if (seconds != -1) {
            document.getElementById('Progressbar9timeout').innerHTML = LOCALE_winsetup[20].replace('000', seconds)
            seconds = seconds - 1
        } else {
            clearInterval(secondsInterval)
            document.getElementById('InstallGUI').style.display = 'none'
            setTimeout(() => {
                window.location.href = "../../BIOSnSTART/checkSetupState_andStart.html"
            }, 2000)
        }
    },1000)
}

function skipInstallEnd () {
    clearInterval(secondsInterval)
    document.getElementById('InstallGUI').style.display = 'none'
    setTimeout(() => {
        window.location.href = "../../BIOSnSTART/checkSetupState_andStart.html"
    }, 2000)
}



setTimeout(() => {
    document.getElementById('SetupIsStarting').style.display = "none"
    DisplayInstallGUI()
}, 7500);

$('#SetupIsStarting').html(LOCALE_winsetup[22])
$('.InstallProgress h1:nth-child(1) span').html(LOCALE_winsetup[1])
$('#SetupIsStarting').html(LOCALE_winsetup[22])