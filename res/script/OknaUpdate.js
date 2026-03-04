function CheckUpdates() {
    console.log('Checking updates...')
    axios.post(VERSION.server + '/okna/GetUpdates', '{"ver":108}').then(response=>{
        if (response.data.success) {
            var updateFile = response.data.updateFile
            if (updateFile.LatestVer > VERSION.build) {
                DisplayNotify('<h1>Доступна новая версия Okna8</h1><p>Коснитесь здесь, чтобы просмотреть подробности</p>', 'ModalMetroDialog(LOCALE_startscreen[24].replaceAll(\'|currentver|\', \'' + VERSION.ver + '\').replaceAll(\'|newver|\', \'' + updateFile.LatestVerName + '\').replaceAll(\'|link|\', \'' + updateFile.LatestVerDownload + '\'))')
            } 
        }
    })
}

CheckUpdates()

setInterval(CheckUpdates, 500000)