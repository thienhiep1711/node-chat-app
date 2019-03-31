var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Jen";
        var text = "Hey. I am Jen";
        var message = generateMessage(from, text);

        expect(typeof message.createAt).toBe('number')
        expect(message).toContain({from,text})
        // strore res in variable

        // assert from match

        // assert text form match

        // assert createAt it number
    })
})