function StartScreenAnimation() {
    ColorPaletteApply()
    $('.tilesContainer > div').css('animation', 'none')
    $('.tilesContainer').css('animation', 'none')
    $('.tilesContainer > div').css('opacity', '0')
    $('.startScreen').css('display', 'block')
    setTimeout(() => {
        for (let i = 0; i < Colums.length; i++) {
            $('.tilesContainer > div:nth-child(' + (i + 1) + ')').css('animation', 'StartScreenColumnAnim 1s ' + (i * 0.1) + 's cubic-bezier(0.1, 0.9, 0.2, 1) forwards')
        }
        $('.tilesContainer').css('animation', 'Metro_ShowAni1 cubic-bezier(0.1, 0.9, 0.2, 1) 1.5s forwards')
    }, 100);
}