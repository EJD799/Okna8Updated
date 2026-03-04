function MenuBar(element) {
    sendToTop('MenuBar|' + WindowID + '|' + $('#MenuBarElement_' + element).offset()['left'] + '|' + MenuBars[element])
}