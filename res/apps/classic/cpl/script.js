var CurrentPage = 'MainPage'
var PrevPage = 'MainPage'
var PagesHistoryPos = 0
var PagesHistory = []

window.addEventListener('message', function (event) {
    if (event.data.startsWith('YourID-')) {
        WindowID = Number(event.data.replace('YourID-', ''))
        sendToTop('SetWindowIcon' + WindowID + '|' + 'img/shell/imageres/27.ico')
        sendToTop('SetWindowHeader' + WindowID + '|' + LOCALE_control[1])
    } else if (event.data.startsWith('Arguments-')) {
        if (event.data.substring(10).split(' ')[0] != '') {
            OpenControlContentPage(event.data.substring(10).split(' ')[0])
        } else {
            PagesHistory = ['MainPage']
        }
    }
})

var ScriptsAfterPageLoad = {
    'SystemInfo': () => {
        if (ConfigPC['RAM'] < 1024) {
            $('#CONTROLPANEL_SystemInfo_RAM').html(ConfigPC['RAM'] + ' ' + LOCALE_control[2]['SystemInfo'][2])
        } else {
            $('#CONTROLPANEL_SystemInfo_RAM').html((ConfigPC['RAM'] / 1024).toFixed(2).replace('.', ',') + ' ' + LOCALE_control[2]['SystemInfo'][1])
        }
        $('#CONTROLPANEL_SystemInfo_CPU').html(ConfigPC['CPU'] + ' ' + (ConfigPC['CPUFreq'] / 1000).toFixed(2) + ' GHz')
        $('#CONTROLPANEL_SystemInfo_PcName').html(localStorage.getItem('OKNA8_pcname'))
        $('#CONTROLPANEL_SystemInfo_FullPcName').html(localStorage.getItem('OKNA8_pcname'))
        if (ConfigPC.OEM.Manufacturer != null) {
            $('#CONTROLPANEL_SystemInfo_OEM_ManufacturerTr').css('display', 'table-row')
            $('#CONTROLPANEL_SystemInfo_OEM_Manufacturer').html(ConfigPC.OEM.Manufacturer)
        }
        if (ConfigPC.OEM.Model != null) {
            $('#CONTROLPANEL_SystemInfo_OEM_ModelTr').css('display', 'table-row')
            $('#CONTROLPANEL_SystemInfo_OEM_Model').html(ConfigPC.OEM.Model)
        }
        if (ConfigPC.OEM.Website != null || ConfigPC.OEM.PhoneNumber != null) {
            $('#CONTROLPANEL_SystemInfo_OEMSupportLine').css('display', 'block')
            $('#CONTROLPANEL_SystemInfo_OEMSupport').css('display', 'block')
            $('#CONTROLPANEL_SystemInfo_OEMSupport_Manufacturer').html(ConfigPC.OEM.Manufacturer)
            if (ConfigPC.OEM.PhoneNumber != null) {
                $('#CONTROLPANEL_SystemInfo_OEMSupport_PhoneNumberTr').css('display', 'table-row')
                $('#CONTROLPANEL_SystemInfo_OEMSupport_PhoneNumber').html(ConfigPC.OEM.PhoneNumber)
            }
            if (ConfigPC.OEM.Website != null) {
                $('#CONTROLPANEL_SystemInfo_OEMSupport_WebsiteTr').css('display', 'table-row')
                $('#CONTROLPANEL_SystemInfo_OEMSupport_Website').html(ConfigPC.OEM.Website)
            }
        }
    },
    'Personalize': () => {
        OpenPersonalizePage()
    },
    'DesktopWallpaper': () => {
        OpenDesktopWallpaperPage()
    }
}

var CplPaths = {
    'SystemInfo': ['SystemNSecurity'],
    'SystemNSecurity': [],
    'AppearanceNPersonalize': [],
    'Personalize': ['AppearanceNPersonalize'],
    'WindowColors': ['AppearanceNPersonalize', 'Personalize'],
    'DesktopWallpaper': ['AppearanceNPersonalize', 'Personalize'],
}

function OpenControlContentPageBase(PageID) {
    $('.controlContent').css('display', 'none')
    $('#ControlContent' + PageID).css('display', 'block')
    $('.adressbar').html('<div onclick="OpenControlContentPage(\'MainPage\')">' + LOCALE_control[2]['MainPage'][0] + '</div>')
    if (PageID != 'MainPage') {
        for (let i = 0; i < CplPaths[PageID].length; i++) {
            $('.adressbar').append('<div onclick="OpenControlContentPage(\'' + CplPaths[PageID][i] + '\')">' + LOCALE_control[2][CplPaths[PageID][i]][0] + '</div>')
        }
        $('.adressbar').append('<div onclick="OpenControlContentPage(\'' + PageID + '\')">' + LOCALE_control[2][PageID][0] + '</div>')
    }
    sendToTop('SetWindowHeader' + WindowID + '|' + LOCALE_control[2][PageID][0])
    setTimeout(() => {
        if (ScriptsAfterPageLoad[PageID] != null) {
            ScriptsAfterPageLoad[PageID]()
        }
    }, 10)
}

function OpenControlContentPage(PageID) {
    if (CurrentPage != PageID) {
        PrevPage = CurrentPage
        CurrentPage = PageID
        PagesHistory.push(PageID)
        PagesHistoryPos = PagesHistory.length - 1
        OpenControlContentPageBase(PageID)
        UpdNavButtons()
    }
}

function UpdNavButtons() {
    if (PagesHistoryPos + 1 == PagesHistory.length) {
        $('.nav .backnext .next').prop('disabled', true)
    } else {
        $('.nav .backnext .next').prop('disabled', false)
    }
    if (PagesHistoryPos == 0) {
        $('.nav .backnext .back').prop('disabled', true)
    } else {
        $('.nav .backnext .back').prop('disabled', false)
    }
}

function OpenPrevPage() {
    if (PagesHistoryPos - 1 != -1) {
        var PageID = PagesHistory[PagesHistoryPos - 1]
        PrevPage = CurrentPage
        CurrentPage = PageID
        PagesHistoryPos = PagesHistoryPos - 1
        OpenControlContentPageBase(PageID)
        UpdNavButtons()
    }
}

function OpenNextPage() {
    if (PagesHistoryPos + 1 != PagesHistory.length) {
        var PageID = PagesHistory[PagesHistoryPos + 1]
        PrevPage = CurrentPage
        CurrentPage = PageID
        PagesHistoryPos = PagesHistoryPos + 1
        OpenControlContentPageBase(PageID)
        UpdNavButtons()
    }
}