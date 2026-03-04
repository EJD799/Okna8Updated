var MenuBars = {
    'file': `
        <div class="element" onclick="
        CreateWindow('../taskmgr/createTask.html', {
            'width': '427px',
            'height': '236px',
            'top': $('#Window_${WindowID}').offset()['top'] + 51 + 'px',
            'left': $('#Window_${WindowID}').offset()['left'] + 8 + 'px',
            'onlyClose': true,
            'resizable': false,
            'processname': 'taskmgr'
        })
        ">Запустить новую задачу</div>
        <div class="element" onclick="CloseWindow('${WindowID}')">Выход</div>
    `,
    'settings': `
        <div class="element" onclick="if (localStorage.getItem('OKNA8_TaskMgr_DisplayOnTop') == 1) {localStorage.removeItem('OKNA8_TaskMgr_DisplayOnTop');CloseWindow('${WindowID}');Exec('taskmgr')} else {localStorage.setItem('OKNA8_TaskMgr_DisplayOnTop', 1);CloseWindow('${WindowID}');Exec('taskmgr')}">Поверх остальных окон</div>
    `,
}

if (localStorage.getItem('OKNA8_TaskMgr_DisplayOnTop') == 1) {
    MenuBars.settings = MenuBars.settings.replace(
        `<div class="element" onclick="if (localStorage.getItem('OKNA8_TaskMgr_DisplayOnTop') == 1) {localStorage.removeItem('OKNA8_TaskMgr_DisplayOnTop');CloseWindow('${WindowID}');Exec('taskmgr')} else {localStorage.setItem('OKNA8_TaskMgr_DisplayOnTop', 1);CloseWindow('${WindowID}');Exec('taskmgr')}">`,
        `<div class="element" onclick="if (localStorage.getItem('OKNA8_TaskMgr_DisplayOnTop') == 1) {localStorage.removeItem('OKNA8_TaskMgr_DisplayOnTop');CloseWindow('${WindowID}');Exec('taskmgr')} else {localStorage.setItem('OKNA8_TaskMgr_DisplayOnTop', 1);CloseWindow('${WindowID}');Exec('taskmgr')}"><div class="CheckMark"></div>`
    )
}

function MenuBar(element) {
    sendToTop('MenuBar|' + WindowID + '|' + $('#MenuBarElement_' + element).offset()['left'] + '|' + MenuBars[element])
}