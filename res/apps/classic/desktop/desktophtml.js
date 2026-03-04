var res = ''
var desktopRes = 'apps/classic/desktop/'
var locale = localStorage.getItem('OKNA8_locale')
var localepath = res + 'localization/' + locale + '/'
var currentUser = 'system'

var lockscreen = /*html*/ `
    <div class="HTMLpreloader" style="display:none;width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 99999; background-color: black; transition: 0.5s cubic-bezier(0.1, 0.9, 0.2, 1)"></div>
        
    <div class="lock">
        <div class="clock LockScreenTime">6:24</div>
        <div class="date LockScreenDate">четверг, 24 июня</div>
        <img src="img/lockscreen/ethernet.png" style="position: absolute;left:92px;bottom:62px" alt="">
    </div>
    <div class="selectuser">
        <div class="userslist"></div>
        <div id="lock_powerbtn" onclick="DisplayPowerMenuOnLock()"><p></p></div>
    </div>
    
    <div id="shutdownscreen" style="display:none">
        <h1 class="pleasewait"><div class="progress-ring">${Metro_ProgressRing}</div>Подождите</h1>
        <h1 class="shutdown"><div class="progress-ring">${Metro_ProgressRing}</div>Завершение работы</h1>
        <h1 class="reboot"><div class="progress-ring">${Metro_ProgressRing}</div>Перезагрузка</h1>
        <h1 class="logoff"><div class="progress-ring">${Metro_ProgressRing}</div>Выход из системы</h1>
    </div>
    
    <div class="watermark"></div>
`

var startscreen = /*html*/ `
    <div class="removeAfterLogoff">
        <div class="startScreen" id="startScreen">
            <div class="tiles">
                <div class="StartScreenBackground" style="display: none"></div>
                <div style="height: 100vh" class="content">
                    <p id="startscreen_Start-label" style="margin-top: 0px; font-weight: 100; color: white; font-size: 56px; top: 35px; left: 115px; margin-bottom: 53px; position: absolute"></p>
                    <div class="tilesContainer" id="StartTilesContainer"></div>
                    <style class="tilesContainerStyle"></style>
                    <div class="downButton" style="position: fixed; left: 120px; bottom: 68px">
                        <span style="transform: rotateZ(-90deg)" class="backbtn" onclick="displayStartApps()"><span style="top: -7px" class="s1"></span><span style="top: -7px" class="s2"></span></span>
                    </div>
                    <div class="MinimizeTiles" onclick="MinimizeTiles()"></div>
                    <div id="start_powerbtn" onclick="DisplayPowerMenuOnStart ()"><p></p></div>
                    <div id="start_searchbtn" onclick="cb_search('apps')"><p></p></div>
                    <div id="start_avatar" class="" onclick="DisplayAvatarMenuOnStart()">
                        <h1>defaultUser</h1>
                        <br/>
                        <h2>defaultUser</h2>
                        <img draggable="false" src="img/avatar.png" style="width: 40px; height: 40px" alt="" />
                    </div>
                </div>
            </div>
            <div class="apps">
                <div>
                    <p id="startscreen_Apps-label" style="margin-top: 0px; font-weight: 100; color: white; font-size: 56px; top: 35px; left: 115px; margin-bottom: 53px; position: absolute">apps</p>
                    <div class="downButton" style="position: absolute; z-index: 10000; left: 120px; bottom: 68px">
                        <span style="transform: rotateZ(90deg)" class="backbtn" onclick="displayStartTiles()"><span style="top: -7px" class="s1"></span><span style="top: -7px" class="s2"></span></span>
                    </div>
                    <div class="appscontainer"></div>
                    <input tabindex="-1" type="text" id="AppsSearchInput" />
                </div>
            </div>
        </div>
    </div>
`

var additionalHtml = /*html*/ `
    <div class="removeAfterLogoff">
        <style id="styleMetroColors"></style>

        <div class="contextmenu"></div>
        <div class="metrocontextmenu"></div>
        <div class="metrocontextmenucompact"></div>

        <div class="metrowindows-container"></div>

        <div class="MetroNotifyContainer">
            <div class="MetroNotification">
                <h1></h1>
                <p></p>
                <div class="Close" onclick="CloseNotify()"><p></p></div>
            </div>
        </div>

        <div class="AppSplashContainer">
            <div class="Splash"><img src="" alt="" /></div>
        </div>

        <div class="AppSplashContainerV2">
            <div class="SplashV2"><img src="" alt="" /></div>
        </div>

        <div class="EOSNotify">
            <div class="content"></div>
        </div>

        <div id="startButtonOnDesktop" onclick="startButtonOnDesktopPress()">
            <iframe src="apps/classic/desktop/startbutton.html" id="startbutton" style="width: 100%; height: 40px" frameborder="0"></iframe>
        </div>
    </div>
`

var desktop = /*html*/ `
    <div class="removeAfterLogoff">
        <div id="DESKTOP">
            <div class="desktopIcons" id="DesktopIcons"></div>
            <style id="DesktopThemeStyle"></style>
            <section id="Section-Windows" class="Section-Windows"></section>
            <div class="desktop-taskbar-drop">
                <div class="desktop-taskbar" id="desktop-taskbar">
                    <div class="openedWindows" id="DesktopTaskbarOpenedWindows"></div>
                </div>
                <div class="desktop-taskbar-minimizeAllWindows" onclick="MinimizeWindows()"></div>
                <div class="desktop-taskbar-tray">
                    <div class="desktop-taskbar-tray-clock">
                        <div class="desktop-taskbar-tray-clock-time">06:24</div>
                        <div class="desktop-taskbar-tray-clock-date">10.01.2023</div>
                    </div>
                    <div class="desktop-taskbar-tray-lang">
                        <div>РУС</div>
                    </div>
                    <div class="desktop-taskbar-tray-sound"></div>
                    <div class="desktop-taskbar-tray-ethernet" onclick="cb_network()"></div>
                </div>
            </div>
            <div class="desktop-taskbar-window">
                <div class="desktop-taskbar-window-clock">
                    <div class="desktop-taskbar-window-clock-cont">
                        <div class="desktop-taskbar-window-clock-cont-header LongDate">10 января 2010 г.</div>
                        <iframe src="${desktopRes}../analogclock/analogclock.html" frameborder="0"></iframe>
                        <iframe src="${desktopRes}calendar.html" style="width: 154px; left: 14px; height: 170px; top: 51px" frameborder="0"></iframe>
                    </div>
                </div>
                <div class="desktop-taskbar-window-lang">
                    <div class="desktop-taskbar-window-lang-list"></div>
                    <span></span>
                    <h5></h5>
                    <p></p>
                </div>
                <div class="desktop-taskbar-window-sound">
                    <div class="desktop-taskbar-window-sound-cont">
                        <div class="desktop-taskbar-window-sound-cont-audiodevice"></div>
                        <div class="desktop-taskbar-window-sound-cont-volume"></div>
                        <input type="range" onchange="PlaySound('Windows Background.wav')" class="desktop-taskbar-window-sound-cont-range" min="0" max="100" step="1" value="2" />
                    </div>
                </div>
                <div class="build"></div>
                <div class="desktop-taskbar-window-back"></div>
            </div>
        </div>
    </div>
`

async function LogOn(user) {
    currentUser = user
    sessionStorage.setItem('OKNA8_sessionUser', currentUser)
    $('body').append(startscreen)
    $('body').append(desktop)
    $('body').append(additionalHtml)
    await addStyles(desktopRes + 'MetroWindowManager.css')
    await addStyles(desktopRes + 'StartScreenBackground.css')
    await addStyles('style/charmsbar.css')
    await addStyles(desktopRes + 'desktop.css')
    await addScript(localepath + 'startscreen.js')
    await addScript(localepath + 'desktop.js')
    await addScript(localepath + 'metroappsnames.js')
    await addScript('script/Tray.js')
    await addScript('script/charmsbar.js')
    await addScript('script/TilesInfo.js')
    await addScript('script/search-data.js')
    await ConnectApps()
    document.dispatchEvent(new CustomEvent('AppsLoaded'))
    await addScript('script/LiveTiles.js')
    await addScript('script/MetroColors.js')
    await addScript('script/StartScreenAnimation.js')
    await addScript('script/TilesContainer.js')
    await addScript('script/StartScreenBackground.js')
    await addScript('script/StartScreenApps.js')
    await addScript('script/MetroWindowManager.js')
    await addScript('script/Script.js')
    await addScript('script/DesktopLocalization.js')
    await addScript('script/rgbaster.js')
    await addScript('script/Theme.js')
    await addScript('script/Desktop.js')
    await addScript('script/Store.js')
    await addScript('script/OknaUpdate.js')
    HideWelcomeScreen()
    document.dispatchEvent(new CustomEvent('LoggedIn'))
    OnlineAccount.sync()
}


async function loadlockscreen() {
    await addScript(localepath + 'Lockscreen.js')
    await addScript(localepath + 'charmsbar.js')
    await addScript(localepath + 'clock.js')
    await $('body').append(lockscreen)
    await addStyles('style/metroui.css')
    await addStyles('apps/classic/desktop/lockscreen.css')
    await addScript('script/Lockscreen.js')
    await addScript('script/Clock.js')
    await addScript('script/UserAppsInit.js')
    if (performance.now() > 2000) {
        $('#BootFrame')[0].contentWindow.postMessage('HideBootscreen', '*')
        setTimeout(() => {
            $('.bootscreen').css('display', 'none')
            DisplayLockscreen()
        }, 1000)
    } else {
        setTimeout(() => {
            $('#BootFrame')[0].contentWindow.postMessage('HideBootscreen', '*')
            setTimeout(() => {
                $('.bootscreen').css('display', 'none')
                DisplayLockscreen()
            }, 1000)
        }, 2000)
    }
}

loadlockscreen()

function HideWelcomeScreen() {
    if (localStorage.getItem('OKNA8_user_' + currentUser + '_GoToDesktopInsteadOfStartscreen') != 'true') {
        $('.tilesContainer').css('animation', 'none')
        $('.tilesContainer').css('#startscreen_Start-label, .btn_down, #start_avatar, #start_powerbtn, #start_searchbtn, .startScreen > .tiles > div > .downButton', 'none')
        $('#startscreen_Start-label, .btn_down, #start_avatar, #start_powerbtn, #start_searchbtn, .startScreen > .tiles > div > .downButton').css('opacity', '0')
        $('#startscreen_Start-label, .btn_down, #start_avatar, #start_powerbtn, #start_searchbtn, .startScreen > .tiles > div > .downButton').css('animation', 'none')
        setTimeout(() => {
            $('#startscreen_Start-label, .btn_down, #start_avatar, #start_powerbtn, #start_searchbtn, .startScreen > .tiles > div > .downButton').css('animation', 'fadeani 2s 0.1s cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
            StartScreenAnimation()
            $('.welcome .usercontainer').css('margin-left', '-100px')
        }, 50)
    } else {
        $('.startScreen').css('display', 'none')
    }
    setTimeout(() => {
        $('.welcome .usercontainer').css('transition', 'cubic-bezier(0.1, 0.9, 0.2, 1) 500ms')
        $('.welcome').css('opacity', '0')
        setTimeout(() => {
            $('.welcome').css('display', 'none')
        }, 600)
    }, 200)
    systemIsLocked = false
    $('.StartScreenBackground').css('display', 'none')
    setTimeout(() => {
        $('.StartScreenBackground').css('display', 'block')
    }, 100)
}
