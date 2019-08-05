import { commands, window, TextDocument, Selection } from 'vscode'

export function calculate() {
    return commands.registerCommand('simTimesheet.calculate', async () => {
        let editor = window.activeTextEditor
        let thisDoc = window.activeTextEditor.document
        processSelection(thisDoc, editor.selection)

    })
}

function processSelection(document: TextDocument, selection: Selection) {
    var startLine: number = selection.start.line
    var endLine: number = selection.end.line
    var tempDurationMinute = 0
    for (let lineIndex = startLine; lineIndex < endLine + 1; lineIndex++) {
        var textAtLine = document.lineAt(lineIndex).text
        if (textAtLine.length > 0) {
            tempDurationMinute += processLine(textAtLine)
        }
    }
    window.showInformationMessage("Work Duration : " + getHourFromMinute(tempDurationMinute))
}

function processLine(line: string): number {
    var tupleStams = getHourStamps(line)
    if (tupleStams.length == 2) {
        var startTime = getDateObject(tupleStams[0])
        var endTime = getDateObject(tupleStams[1])
        var diffMili = Math.abs(<any>endTime - <any>startTime)
        var diffMinutes = Math.round(diffMili / 1000 / 60)
        return diffMinutes
    }
    else {
        return 0
    }
}

function getHourFromMinute(minute: number): string {
    var newHour = Math.floor(minute / 60)
    var newMinute = minute % 60

    var hourString = newHour > 1 ? " hours " : " hour "
    var minuteString = newMinute > 1 ? " minutes" : " minute"

    return newHour + hourString + newMinute + minuteString;
}

function getDateObject(string: string): Date {
    let [hours, minutes, seconds] = string.split('.')
    var d = new Date(`2000-01-01 ${hours}:${minutes}:${seconds}`)
    return d
}

function getHourStamps(sentence: string): string[] {
    var pattern = /(?:[01]\d|2[0-3]).(?:[0-5]\d).(?:[0-5]\d)/g
    var results = sentence.match(pattern)
    return results || []
}