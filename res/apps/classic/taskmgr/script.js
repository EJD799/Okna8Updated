function UpdateTaskMgr() {
    sendToTop(`eval>
        var TaskmgrTempProcessesInfo = []
        for (let i = 0; i < OpenedWindowsIDs.length; i++) {
            TaskmgrTempProcessesInfo.push([OpenedWindowsIDs[i], ProcessesInfo[OpenedWindowsIDs[i]]['title'], ProcessesInfo[OpenedWindowsIDs[i]]['icon'], ProcessesInfo[OpenedWindowsIDs[i]]['processname']])
        }
        sendToWin('WindowFrame_${WindowID}', 'ProcessesInfo_' + JSON.stringify(TaskmgrTempProcessesInfo))
        delete TaskmgrTempProcessInfo
    `)
}

var CurrentSelectedProcess = ''

function KillProcess() {
    sendToTop('eval>CloseWindow(\'' + CurrentSelectedProcess + '\')')
}

function SelectProcess(ID) {
    $('.processList > .process').removeClass('active')
    $('#ProcessList_Process_' + ID).addClass('active')
    CurrentSelectedProcess = ID
}

window.addEventListener('message', function (event) {
    if (event.data.startsWith('ProcessesInfo')) {
        var ProcessesInfo = JSON.parse(event.data.substring(14))
        $('.processList').html('')
        for (let i = 0; i < ProcessesInfo.length; i++) {
            var active = ''
            if (ProcessesInfo[i][0] == CurrentSelectedProcess) {
                active = 'active'
            }
            $('.processList').append(`
                <div class="process ${active}" id="ProcessList_Process_${ProcessesInfo[i][0]}" onclick="SelectProcess('${ProcessesInfo[i][0]}')">
                    <table> 
                        <tr>
                            <td><img src="../../../${ProcessesInfo[i][2]}" alt=""></td>
                            <td><p>${ProcessesInfo[i][3]}</p></td>
                            <td><p>${ProcessesInfo[i][0]}</p></td>
                            <td><p>${ProcessesInfo[i][1]}</p></td>
                        </tr>
                    </table>
                </div>
            `)
        }
    }
})

setInterval(UpdateTaskMgr, 1000)