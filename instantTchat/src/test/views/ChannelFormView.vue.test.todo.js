import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory, routerKey } from 'vue-router';
import ChannelFormView from '../../views/ChannelFormView.vue';
import useChannelStore from '../../stores/channel-store';
import {describe, expect, it, beforeEach } from 'vitest';
import { createPinia } from 'pinia';
import { vi } from 'vitest';

const createMockRouter = () => {
    return {
        push: vi.fn(),
    };
};

const mountWithRouter = (component) => {
    const mockRouter = createMockRouter();
    return mount(component, {
        global: {
            provide: {
            [routerKey]: mockRouter,
            },
        },
    });
};

describe('ChannelFormView', () => {
    const pinia = createPinia();
    let wrapper;
    let channelStore;
    const history = createMemoryHistory();

    beforeEach(() => {
        const router = createRouter({history, routes: []});
        channelStore = useChannelStore(pinia);
        const mockRouter = createMockRouter();
        router.push = () => {};
        wrapper = mount(ChannelFormView, {
            global: {
                plugins: [pinia, router],
            },
        });
        localStorage.setItem('token', "token");
    });

    const token = localStorage.getItem('token');


    it('should render the component correctly', () => {
        const wrapper = mount(ChannelFormView);
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('should show and close the custom theme modal', async () => {
        // Simulate a click on the "Custom Theme" button
        const customThemeBtn = wrapper.find('#custom-theme');
        await customThemeBtn.trigger('click');
    
        // Verify that the custom theme modal is displayed
        const customThemeModal = wrapper.find('.custom-theme-modal');
        expect(customThemeModal.exists()).toBe(true);
    
        // Simulate a click on the "Close" button
        const closeBtn = wrapper.find('.close-button');
        await closeBtn.trigger('click');
    
        // Verify that the custom theme modal is closed
        expect(customThemeModal.exists()).toBe(false);
    });

    it('should apply custom theme colors correctly', async () => {
        // Simulate a click on the "Custom Theme" button
        const customThemeBtn = wrapper.find('#custom-theme');
        await customThemeBtn.trigger('click');
    
        // Simulate the selection of the "Custom Theme" option
        const customThemeOption = wrapper.find('input[type="radio"][value="custom"]');
        await customThemeOption.trigger('click');
    
        // Simulate a change in the custom theme colors
        const accentColorInput = wrapper.find('.color-input:nth-child(3)');
        await accentColorInput.setValue('#FF5E5E');
    
        const primaryColorInput = wrapper.find('.color-input:nth-child(1)');
        await primaryColorInput.setValue('#1C1C1E');
    
        // Verify that the preview theme has the correct custom colors
        const previewTheme = wrapper.find('.color-preview');
        expect(previewTheme.attributes('style')).toContain('background-color: #1C1C1E;');
        expect(previewTheme.attributes('style')).toContain('color: #E5E5E5;');
        expect(previewTheme.attributes('style')).toContain('background-color: #FF5E5E;');
    
        // Simulate a click on the "Validate" button
        const validateBtn = wrapper.find('.confirm-btn');
        await validateBtn.trigger('click');
    
        // Verify that the custom theme modal is closed
        const customThemeModal = wrapper.find('#custom-theme-modal');
        expect(customThemeModal.exists()).toBe(false);
    
        // Verify that the app theme has the correct custom colors
        expect(custom.primary_color).toBe('#1C1C1E');
        expect(custom.accent_color).toBe('#FF5E5E');
    });
    
    // it('should redirect to home page when clicking on the "Cancel" button', async () => {
    //     // Simulate a click on the "Cancel" button
    //     const cancelBtn = wrapper.find('.close-button');
    //     await cancelBtn.trigger('click');
    
    //     // Verify that the user is redirected to the home page
    //     expect(wrapper.vm.$router.currentRoute.value.path).toBe('/');
    // });

    it('should redirect to home page when clicking on the "Cancel" button', async () => {
        const wrapper = mountWithRouter(ChannelFormView);
        const cancelBtn = wrapper.find('.close-button');
        await cancelBtn.trigger('click');
        
        const routerPushSpy = wrapper.vm.$router.push;
        expect(routerPushSpy).toHaveBeenCalledTimes(1);
        expect(routerPushSpy).toHaveBeenCalledWith('/');
    });
    

});
