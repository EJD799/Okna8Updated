var MenuBars = {
    'file': `
        <div class="element" onclick="">Создать</div>
        <div class="element" onclick="">Открыть...</div>
        <div class="element" onclick="">Сохранить</div>
        <div class="element" onclick="">Сохранить как...</div>
        <div class="separator"></div>
        <div class="element" onclick="">Параметры страницы...</div>
        <div class="element" onclick="">Печать...</div>
        <div class="separator"></div>
        <div class="element" onclick="CloseWindow('${WindowID}')">Выход</div>
    `,
    'edit': `
        <div class="element">Отменить</div>
        <div class="separator"></div>
        <div class="element">Вырезать</div>
        <div class="element">Копировать</div>
        <div class="element">Вставить</div>
        <div class="element">Удалить</div>
        <div class="separator"></div>
        <div class="element">Найти...</div>
        <div class="element">Найти далее</div>
        <div class="element">Заменить...</div>
        <div class="element">Перейти...</div>
        <div class="separator"></div>
        <div class="element">Выделить всё</div>
        <div class="element">Время и дата</div>
    `,
    'format': `
        <div class="element">Перенос по словам</div>
        <div class="element">Шрифт...</div>
    `,
    'view': `
        <div class="element">Строка состояния</div>
    `,
    'help': `
        <div class="element" onclick="">Показать справку</div>
        <div class="separator"></div>
        <div class="element" onclick="Exec('winver')">О программе</div>
    `,
}

function MenuBar(element) {
    sendToTop('MenuBar|' + WindowID + '|' + $('#MenuBarElement_' + element).offset()['left'] + '|' + MenuBars[element])
}