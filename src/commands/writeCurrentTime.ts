import { commands, window, Selection } from 'vscode'

export function writeCurrentTime() {
    return commands.registerCommand('simTimesheet.writeCurrentTime', () => {
        let editor = window.activeTextEditor
        editor.edit(editBuilder => {
            const unique = getCurrentTimeStamp()
            editBuilder.replace(editor.selection, unique)
        }).then(success => {
            var cursorEndPosition = editor.selection.end
            editor.selection = new Selection(cursorEndPosition, cursorEndPosition)
        })
    })
}


function getCurrentTimeStamp(): string {
    var today = new Date()
    const sentence = `${today.getHours().toString().padStart(2, '0')}.${today.getMinutes().toString().padStart(2, '0')}.${today.getSeconds().toString().padStart(2, '0')}`
    return sentence
}
