metro_open = (appname, color, headername, path) => {
    CreateWindow('../../../script/AdditionalFeatures/WindowedMetroApps.html', {
        'width': '1000px',
        'height': '600px',
        'left': 'calc(50vw - 500px)',
        'top': 'calc(50vh - 300px)',
        'args': JSON.stringify({
            'path': path,
            'title': headername
        })
    })
    closeStart()
}

metro_open_fromstartscreen = (appname, color, position, tiletype, headername, path) => {
    CreateWindow('../../../script/AdditionalFeatures/WindowedMetroApps.html', {
        'width': '1000px',
        'height': '600px',
        'left': 'calc(50vw - 500px)',
        'top': 'calc(50vh - 300px)',
        'args': JSON.stringify({
            'path': path,
            'title': headername,
            'appname': appname
        })
    })
    closeStart()
}

closemetroapp = (app, fromdesktop) => {
    CloseWindow($('#metrowindow_' + app + ' > iframe')[0].id.substring(12))
}

console.log('Enabled WindowedMetroApps')