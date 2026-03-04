sendToTop(`eval>
    $('#Window_${WindowID} .WindowHeader').css('color', 'transparent')
    $('#Window_${WindowID} img').css('display', 'none')
    $('#Window_${WindowID} iframe').css('box-shadow', 'none')
    $('#Window_${WindowID} iframe').css('left', '7px')
    $('#Window_${WindowID} iframe').css('top', '20px')
    $('#Window_${WindowID} iframe').css('width', 'calc(100% - 14px)')
    $('#Window_${WindowID} iframe').css('height', 'calc(100% - 28px)')
    $('#Window_${WindowID} .IframeIgnoreLayer').css('left', '7px')
    $('#Window_${WindowID} .IframeIgnoreLayer').css('top', '20px')
    $('#Window_${WindowID} .IframeIgnoreLayer').css('width', 'calc(100% - 14px)')
    $('#Window_${WindowID} .IframeIgnoreLayer').css('height', 'calc(100% - 28px)')
`)

var FrameMaxID = 1

function ActivateTab(FrameID) {
    $('.tabs .tab').removeClass('active')
    $('#Tab_' + FrameID)[0].className = "tab active"
    $('.frames .frame').css('display', 'none')
    $('#Frame_' + FrameID).css('display', 'block')
}

function NewTab() {
    NewFrameID = FrameMaxID
    FrameMaxID++
    $('.tabs .tab').removeClass('active')
    $('.frames .frame').css('display', 'none')
    $('.tabContainer').append(`
        <div class="tab active" onclick="ActivateTab('${NewFrameID}')" id="Tab_${NewFrameID}"><div></div></div>
    `)
    $('.frames').append(`
        <div class="frame" style="display:block" id="Frame_${NewFrameID}">
            <iframe onload="console.log(event)" src="https://google.com/" frameborder="0"></iframe>
        </div>
    `)
}

NewTab()