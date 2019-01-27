var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate currect message object', () => {
        var createdMessage = {from: 'Ivan', text: 'Cool text data'};
        var message = generateMessage(createdMessage.from, createdMessage.text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject(createdMessage);
    });
});