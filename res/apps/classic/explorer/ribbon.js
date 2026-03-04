var PinRibbon = true
var AvailableRibbons = ['computer', 'view']
var RibbonIsDisplay = false

function DisplayRibbon (ribbonid) {
    if (PinRibbon) {
        $('.ribbon').css('display', 'block')
        $('.ribbon').css('position', 'unset')
        $('.ribbonContent').css('display', 'none')
        $('#RibbonContent-' + ribbonid).css('display', 'block')
        $('.explorercontent').css('height', 'calc(100vh - 25px - 90px)')
    } else {
        $('.ribbon').css('display', 'block')
        $('.ribbon').css('position', 'absolute')
        $('.ribbonContent').css('display', 'none')
        $('#RibbonContent-' + ribbonid.substring(15)).css('display', 'block')
        $('.explorercontent').css('height', 'calc(100vh - 25px)')
    }
    $('.menubar .element').removeClass('active')
    $('#menubarElement-' + ribbonid).addClass('active')
    $('#RibbonOnOff > div').css('background-position-y', '-208px')
    RibbonIsDisplay = true
}

$(document).ready(()=>{
    $('.menubar .element').click((e)=>{
        if (!RibbonIsDisplay) {
            PinRibbon = false
        }
        DisplayRibbon(e.target.id.substring(15))
    })
    $('#RibbonOnOff').click(()=>{
        if (RibbonIsDisplay) {
            $('.ribbon').css('display', 'none')
            $('.menubar .element').removeClass('active')
            $('#RibbonOnOff > div').css('background-position-y', '-221px')
            RibbonIsDisplay = false
            $('.explorercontent').css('height', 'calc(100vh - 25px)')
        } else {
            PinRibbon = true
            DisplayRibbon(AvailableRibbons[0])
        }
    }) 
})
