import { expect } from 'chai';
import { generateLocationMessage, generateMessage } from '../utils/message.js';

describe('Generate message', () => {
    it('Should generate correct message object', () => {
        const from = 'Keshav';
        const text = 'Whats poppin?';
        const message = generateMessage(from, text);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.deep.include({ from, text });
    });
});

describe('Generate Location', () => {
    it('should generate my location object', () => {
        const from = "Karan";
        const lat = 15;
        const lng = 56;
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        const message = generateLocationMessage(from, lat, lng);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.deep.include({ from, url });
    });
});
