var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var createdMessage = {from: 'Ivan', text: 'Cool text data'};
        var message = generateMessage(createdMessage.from, createdMessage.text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject(createdMessage);
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var createdMessage  = {from: 'Admin', longtitude: 31.952110800000003, latitude: 34.906551};
        var locationMessage = generateLocationMessage(createdMessage.from,createdMessage.latitude, createdMessage.longtitude);

        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage.from).toBe(createdMessage.from);
        expect(locationMessage.url).toBe('https://www.google.com/maps?q=34.906551,31.952110800000003');
    })
})