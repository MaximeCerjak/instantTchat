// import { createPinia } from 'pinia';
// import useAuthStore from '../../stores/auth-store.js';
// import { login, extendSession } from '../../services/connexion/auth.js';
// import router from '../../router/index.js';
// import { describe, expect, it, beforeEach, afterEach} from 'vitest';
// import { vi } from 'vitest';


// const authServiceMock = {
//     login: vi.fn((params) => {
//         return Promise.resolve({ token: 'mock-token' });
//     }),
//     extendSession: vi.fn((token) => {
//         return Promise.resolve({ token: 'new-token' });
//     }),
// };

// const routerMock = {
//     push: vi.fn(),
// };

// describe('auth-store', () => {
//     let store;

//     beforeEach(() => {
//         const pinia = createPinia();
//         store = useAuthStore(pinia, {authService: authServiceMock, router: routerMock});
//     });

//     afterEach(() => {
//         authServiceMock.login.mockReset();
//         authServiceMock.extendSession.mockReset();
//         routerMock.push.mockReset();
//     });

//     it('isAuthenticated should return false when token is null', () => {
//         expect(store.isAuthenticated).toBe(false);
//     });

//     it('isAuthenticated should return true when token is not null', () => {
//         store.token = 'mock-token';
//         expect(store.isAuthenticated).toBe(true);
//     });
    
//     it('login should call login service, set token and username, and call router.push', async () => {

//         const mockLoginResponse = {
//             token: 'example_token',
//         };

//         authServiceMock.login.mockResolvedValue(mockLoginResponse);

//         const params = {
//             username: 'mock-username',
//             password: 'mock-password',
//         };

//         await store.login(params);

//         expect(authServiceMock.login.mock.calls[0][0]).toEqual(params);
//         expect(store.token).toBe('mock-token');
//         expect(store.username).toBe(params.username);
//         expect(localStorage.getItem('token')).toBe('mock-token');
//         expect(localStorage.getItem('username')).toBe(params.username);
//         expect(routerMock.push.mock.calls[0][0]).toBe('/');
//     });

//     it('extendSession should call extendSession service and update the token', async () => {
//         const initialToken = 'initial-token';
//         const newToken = 'new-token';
//         store.token = initialToken;
    
//         extendSession.returns(Promise.resolve({ token: newToken }));
    
//         await store.extendSession();
    
//         expect(extendSession.calledWith(initialToken)).toBe(true);
//         expect(store.token).toBe(newToken);
//     });

//     it('clearSession should clear the token, username, and localStorage items', () => {
//         store.token = 'mock-token';
//         store.username = 'mock-username';
//         localStorage.setItem('token', 'mock-token');
//         localStorage.setItem('username', 'mock-username');
    
//         store.clearSession();
    
//         expect(store.token).toBeNull();
//         expect(store.username).toBeNull();
//         expect(localStorage.getItem('token')).toBeNull();
//         expect(localStorage.getItem('username')).toBeNull();
//     });
// });
