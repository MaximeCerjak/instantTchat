// router.test.js
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '../../router'; // exportez les routes depuis votre fichier router
import HomeView from '../../views/HomeView.vue';
import LoginView from '../../views/LoginView.vue';
import ChannelFormView from '../../views/ChannelFormView.vue';
import ChatView from '../../views/ChatView.vue';
import { describe, it, expect, afterEach } from 'vitest';


function mockGetItem(token) {
    return function (key) {
        if (key === "token") {
            return token;
        }
        return null;
    };
}

describe('Router', () => {
    it('should have the correct routes', () => {
        const expectedRoutes = [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/add-canal',
            name: 'add-canal',
            component: ChannelFormView,
        },
        {
            path: '/canal/:id',
            name: 'canal',
            component: ChatView,
        },
        ];

        expect(routes).toEqual(expectedRoutes);
    });

    it('should redirect to login if not authenticated', async () => {
        const router = createRouter({
        history: createWebHistory(),
        routes,
        });

        // Mocking localStorage
        Storage.prototype.getItem = mockGetItem(null);

        // Add beforeEach hook
        router.beforeEach((to, from) => {
        const token = localStorage.getItem("token");
        if (
            !token &&
            to.name !== 'login'
        ) {
            return { name: 'login' };
        }
        });

        // Test that the user is redirected to the login page
        await router.push({ name: 'home' });
        expect(router.currentRoute.value.name).toBe('login');
    });

    it('should not redirect to login if authenticated', async () => {
        const router = createRouter({
        history: createWebHistory(),
        routes,
        });

        // Mocking localStorage
        Storage.prototype.getItem = mockGetItem("token");

        // Add beforeEach hook
        router.beforeEach((to, from) => {
        const token = localStorage.getItem("token");
        if (
            !token &&
            to.name !== 'login'
        ) {
            return { name: 'login' };
        }
        });

        // Test that the user is not redirected to the login page
        await router.push({ name: 'home' });
        expect(router.currentRoute.value.name).toBe('home');
    });
});
