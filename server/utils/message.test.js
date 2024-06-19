import { expect } from 'chai';
import { generateMessage } from '../utils/message.js';

describe('Generate message', () => {
    it('Should generate correct message object', () => {
        const from = 'Keshav';
        const text = 'Whats poppin?';
        const message = generateMessage(from, text);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.include({ from, text });
    });
});
