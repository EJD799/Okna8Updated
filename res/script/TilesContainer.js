var addTile
var removeTile
var updtilescontainer
var LiveTiles = []
var CurrentColumnFilled = 0
var CurrentColumn = 0
var Colums = []

function ResetTilesContainer() {
    console.error('Error: tilesContainer in localStorage is not compatible with the current version of Okna8')
    console.warn('Updating localStorage...')
    ModalMetroDialog(LOCALE_startscreen[23])
    localStorage.setItem('OKNA8_user_' + currentUser + '_startScreen-layout', '{"version":107,"tiles":[{"type":"MetroApp","package":"Mail","livetile":0,"size":"wide"},{"type":"MetroApp","package":"Sports","livetile":0,"size":"wide"},{"type":"MetroApp","package":"People","livetile":0,"size":"standart"},{"type":"MetroApp","package":"Skype","livetile":0,"size":"standart"},{"type":"Desktop","size":"wide"},{"type":"MetroApp","package":"Calendar","livetile":1,"size":"wide"},{"type":"MetroApp","package":"Money","livetile":0,"size":"wide"},{"type":"MetroApp","package":"Weather","livetile":0,"size":"large"},{"type":"MetroApp","package":"InternetExplorer","livetile":0,"size":"standart"},{"type":"MetroApp","package":"Music","livetile":0,"size":"standart"},{"type":"MetroApp","package":"Changelog","livetile":1,"size":"wide"},{"type":"MetroApp","package":"Settings","livetile":0,"size":"standart"},{"type":"MetroApp","package":"Photos","livetile":0,"size":"standart"},{"type":"MetroApp","package":"Store","livetile":0,"size":"large"}]}')

    updtilescontainer()
}

$(document).ready(() => {
    updtilescontainer = () => {
        // Проверка версии тайлконтейнера
        if (localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout') == null || !localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout').startsWith('{')) {
            ResetTilesContainer()
            return
        } else if (JSON.parse(localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout')).version != 107) {
            ResetTilesContainer()
            return
        }

        // Подготовка
        var startScreen_layout = JSON.parse(localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout')).tiles
        var tilesContainerHeight = Math.floor((window.innerHeight - 230) / 128)
        $('.tilesContainer').html('')
        LiveTiles = []
        var IncorrectTiles = []
        var CorrectTiles = []
        $('.tilesContainerStyle').html(`
            .tilesContainer .Column {
                height: ${tilesContainerHeight * 128}px;
            }    
        `)

        // Проверка существования пакета
        for (let i = 0; i < startScreen_layout.length; i++) {
            var packagename = ''
            if (startScreen_layout[i].type == 'Desktop') {
                CorrectTiles.push(startScreen_layout[i])
            } else {
                if (startScreen_layout[i].type == 'DesktopApp') {
                    packagename = 'desktop:'
                }
                if (tilesInfo[packagename + startScreen_layout[i].package] == null) {
                    IncorrectTiles.push(startScreen_layout[i])
                } else {
                    CorrectTiles.push(startScreen_layout[i])
                }
            }
        }
        startScreen_layout = CorrectTiles

        // Распределение плиток на колонны
        CurrentColumnFilled = 0
        CurrentColumn = 0
        Colums = []
        for (let i = 0; i < startScreen_layout.length; i++) {
            let CurrentTileSize = 0.5
            if (startScreen_layout[i].size == 'wide') {
                CurrentTileSize = 1
            } else if (startScreen_layout[i].size == 'large') {
                CurrentTileSize = 2
            } else if (startScreen_layout[i].size == 'standart') {
                CurrentTileSize = 0.5
            }
            if (CurrentTileSize + CurrentColumnFilled > tilesContainerHeight) {
                CurrentColumn++
                CurrentColumnFilled = 0
            }

            CurrentColumnFilled = CurrentColumnFilled + CurrentTileSize

            if (typeof Colums[CurrentColumn] == 'undefined') {
                Colums.push([])
            }

            Colums[CurrentColumn].push(startScreen_layout[i])
        }

        // Создание колонн
        for (let i = 0; i < Colums.length; i++) {
            $('.tilesContainer').append(`<div class="Column Column${i}"></div>`)
            // Добавление плиток
            for (let q = 0; q < Colums[i].length; q++) {
                // Начальные значения
                var TileSize = 'standart'
                var AppTile = 'AppTile'
                var TileLabel = ''
                // Установка метки плитки
                if (Colums[i][q].label == null) {
                    if (Colums[i][q].type == 'MetroApp') {
                        TileLabel = LOCALE_appsnames[tilesInfo[Colums[i][q].package][2]]
                    } else if (Colums[i][q].type == 'DesktopApp') {
                        TileLabel = LOCALE_appsnames[tilesInfo['desktop:' + Colums[i][q].package][1]]
                    }
                } else {
                    TileLabel = Colums[i][q][8]
                }
                // Установка размера плитки
                if (Colums[i][q].size == 'wide') {
                    TileSize = 'wide'
                    AppTile = 'AppTileWide'
                } else if (Colums[i][q].size == 'large') {
                    TileSize = 'large'
                    AppTile = 'AppTileLarge'
                }
                
                if (Colums[i][q].type == 'MetroApp') {
                    // Добавление плитки метро-приложения
                    $('.tilesContainer .Column' + i).append(`
                        <div
                            style="background: linear-gradient(90deg, ${tilesInfo[Colums[i][q].package][5]} 0%, ${tilesInfo[Colums[i][q].package][6]} 100%);"
                            class="tile ${TileSize}tile metrotile TILE_${Colums[i][q].package}"
                            id="tile_1_${Colums[i][q].package}"
                            onclick="metro_open_fromstartscreen('${Colums[i][q].package}','${tilesInfo[Colums[i][q].package][5]}',$('.TILE_${Colums[i][q].package}').offset(),'${Colums[i][q].size}',LOCALE_appsnames[${tilesInfo[Colums[i][q].package][2]}],'${tilesInfo[Colums[i][q].package][3]}')" 
                        >
                            <img id="tile_2_${Colums[i][q].package}" src="${desktopRes + tilesInfo[Colums[i][q].package][3] + '/' + AppTile}.png">
                            <p id="tile_3_${Colums[i][q].package}">${TileLabel}</p>
                        </div>
                    `)
                } else if (Colums[i][q].type == 'DesktopApp') {
                    // Добавление плитки оконного приложения
                    var icon
                    if (tilesInfo['desktop:' + Colums[i][q].package][5].startsWith('data:image')) {
                        icon = tilesInfo['desktop:' + Colums[i][q].package][5]
                    } else {
                        icon = desktopRes + tilesInfo['desktop:' + Colums[i][q].package][5]
                    }
                    $('.tilesContainer .Column' + i).append(`
                        <div
                            style="background: linear-gradient(90deg, ${tilesInfo['desktop:' + Colums[i][q].package][2]} 0%, ${tilesInfo['desktop:' + Colums[i][q].package][3]} 100%);" 
                            class="TILE_desktop_${Colums[i][q].package} tile ${TileSize}tile"
                            id="tile_1_desktop_${Colums[i][q].package}"
                            onclick="closeStart();Exec('${Colums[i][q].package}')"
                        >
                            <img id="tile_2_desktop_${Colums[i][q].package}" src="${icon}">
                            <p id="tile_3_desktop_${Colums[i][q].package}">${TileLabel}</p>
                        </div>
                    `)
                } else if (Colums[i][q].type == 'Desktop') {
                    // Добавление плитки рабочего стола
                    $('.tilesContainer .Column' + i).append(`
                        <div class="tile ${TileSize}tile desktoptile" id="tile_1_DESKTOP" onclick="closeStart()">
                            <p id="tile_3_DESKTOP">${LOCALE_startscreen[12]}</p>
                        </div>
                    `)
                }
            }
        }

        // Установка фона плитки рабочего стола
        if (localStorage.getItem('OKNA8_user_' + currentUser + '_appearance_wallpaper') != null) {
            $('.desktoptile').css('background-image', 'url(img/wallpaper/' + localStorage.getItem('OKNA8_user_' + currentUser + '_appearance_wallpaper').split('|')[0] + ')')
            $('.desktoptile').css('background-size', 'cover')
            $('.desktoptile').css('background-position', 'center')
        }
    }
    updtilescontainer()
})

function ResizeTile(package, size) {
    var currentLayout = JSON.parse(localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout'))
    if (package == 'desktop') {
        for (let i = 0; i < currentLayout.tiles.length; i++) {
            if (currentLayout.tiles[i].type == 'Desktop') {
                currentLayout.tiles[i].size = size
            }
        }
    } else {
        for (let i = 0; i < currentLayout.tiles.length; i++) {
            if (currentLayout.tiles[i].package == package) {
                currentLayout.tiles[i].size = size
            }
        }
    }
    localStorage.setItem('OKNA8_user_' + currentUser + '_startScreen-layout', JSON.stringify(currentLayout))
    updtilescontainer()
}

function enableLiveTile(id) {
    setLiveTile(id, '2')
    $('.TILE_' + id).prepend('<iframe style="display:block" class="LiveTileFrame" src="apps/classic/desktop/' + tilesInfo[id][3] + '/LiveTile.html" frameborder=""></iframe>')
    LiveTiles.push(id)
    UpdateLiveTile(id)
}

function disableLiveTile(id) {
    setLiveTile(id, '1')
    DisplayIconOnLiveTile(id)
    LiveTiles.splice(LiveTiles.indexOf(id), 1)
}

function setLiveTile(id, state) {
    var startScreen_layout = localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout').split('|')
    for (let i = 0; i < startScreen_layout.length; i++) {
        startScreen_layout[i] = startScreen_layout[i].split(', ')
        if (startScreen_layout[i][5] == id) {
            startScreen_layout[i][9] = state
        }
    }
    for (let i = 0; i < startScreen_layout.length; i++) {
        startScreen_layout[i] = startScreen_layout[i].join(', ')
    }
    startScreen_layout = startScreen_layout.join('|')
    localStorage.setItem('OKNA8_user_' + currentUser + '_startScreen-layout', startScreen_layout)
}

removeTile = (type, package) => {
    var currentLayout = JSON.parse(localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout'))
    if (type == 'Desktop') {
        for (let i = 0; i < currentLayout.tiles.length; i++) {
            if (currentLayout.tiles[i].type == 'Desktop') {
                currentLayout.tiles.splice(i, 1)
            }
        }
    } else {
        package = package.replace('desktop_', '')
        for (let i = 0; i < currentLayout.tiles.length; i++) {
            if (currentLayout.tiles[i].package == package) {
                currentLayout.tiles.splice(i, 1)
            }
        }
    }
    localStorage.setItem('OKNA8_user_' + currentUser + '_startScreen-layout', JSON.stringify(currentLayout))
    updtilescontainer()
}

addTile = (type, package) => {
    if (type == 'MetroApp') {
        var currentLayout = JSON.parse(localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout'))
        var livetile
        if (tilesInfo[package][7].length != 0) {
            livetile = 1
        } else {
            livetile = 0
        }
        currentLayout.tiles.push({
            type: 'MetroApp',
            package: package,
            livetile: livetile,
            size: tilesInfo[package][0][0],
        })
        localStorage.setItem('OKNA8_user_' + currentUser + '_startScreen-layout', JSON.stringify(currentLayout))
        updtilescontainer()
    } else if (type == 'Desktop') {
        var currentLayout = JSON.parse(localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout'))
        currentLayout.tiles.push({
            type: 'Desktop',
            size: 'wide',
        })
        localStorage.setItem('OKNA8_user_' + currentUser + '_startScreen-layout', JSON.stringify(currentLayout))
        updtilescontainer()
    } else if (type == 'DesktopApp') {
        var currentLayout = JSON.parse(localStorage.getItem('OKNA8_user_' + currentUser + '_startScreen-layout'))
        currentLayout.tiles.push({
            type: 'DesktopApp',
            package: package.replace('desktop_', ''),
        })
        localStorage.setItem('OKNA8_user_' + currentUser + '_startScreen-layout', JSON.stringify(currentLayout))
        updtilescontainer()
    }
}

window.addEventListener('resize', () => {
    if (startIsOpened == 1) {
        updtilescontainer()
        StartScreenAnimation()
    }
})
