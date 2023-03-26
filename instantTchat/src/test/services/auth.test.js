import { login, extendSession } from '../../services/connexion/auth';
import { api } from '../../boot/axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, afterEach, expect } from 'vitest';

const mock = new MockAdapter(api);

const mockLoginResponse = {
    token: 'example_token',
};

const mockExtendSessionResponse = {
    extended: true,
};

describe('auth service', () => {
    afterEach(() => {
        mock.reset();
        });
    
        it('should login successfully', async () => {
        mock.onPost('/login').reply(200, mockLoginResponse);
    
        const response = await login('test_username', 'test_password');
    
        expect(response).toEqual(mockLoginResponse);
        });
    
        it('should throw an error when login fails', async () => {
        mock.onPost('/login').reply(401);
    
        try {
            await login('test_username', 'test_password');
        } catch (error) {
            expect(error.message).toMatch('Request failed with status code 401');
        }
        });
    
        it('should extend session successfully', async () => {
        const token = 'example_token';
        mock.onPost('/protected/extend_session').reply(200, mockExtendSessionResponse);
    
        const response = await extendSession(token);
    
        expect(response).toEqual(mockExtendSessionResponse);
        });
    
        it('should throw an error when extending session fails', async () => {
        const token = 'example_token';
        mock.onPost('/protected/extend_session').reply(401);
    
        try {
            await extendSession(token);
        } catch (error) {
            expect(error.message).toMatch('Request failed with status code 401');
        }
    });
});

