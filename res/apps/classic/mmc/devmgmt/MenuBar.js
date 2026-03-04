var MenuBars = {
    'file': `
        <div class="element">Параметры...</div>
        <div class="separator"></div>
        <div class="element" onclick="CloseWindow('${WindowID}')">Выход</div>
    `,
    'action': `
        <div class="element">Обновить конфигурацию оборудывания</div>
        <div class="element">Установить старое устройство</div>
        <div class="separator"></div>
        <div class="element">Свойства</div>
        <div class="separator"></div>
        <div class="element">Справка</div>
    `,
    'view': `
        <div class="element">Устройства по типу</div>
        <div class="element">Устройства по подключению</div>
        <div class="element">Ресурсы по типу</div>
        <div class="element">Ресурсы по подключению</div>
        <div class="separator"></div>
        <div class="element">Показать скрытые устройства</div>
        <div class="separator"></div>
        <div class="element">Настроить...</div>
    `,
    'help': `
        <div class="element">Вызов справки</div>
        <div class="element">Веб-сайт TechCenter</div>
        <div class="separator"></div>
        <div class="element">О программе "Консоль управления (MMC)"</div>
        <div class="element">О программе "Диспетчер устройств"</div>
    `,
}

function MenuBar(element) {
    sendToTop('MenuBar|' + WindowID + '|' + $('#MenuBarElement_' + element).offset()['left'] + '|' + MenuBars[element])
}