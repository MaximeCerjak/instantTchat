import {expect,describe,it,beforeEach} from "vitest";
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import Channel from '../../components/Channel.vue';

describe('Channel', () => {
    let wrapper;
    const pinia = createPinia();

    beforeEach(() => {
        wrapper = mount(Channel, {
            global: {
                plugins: [pinia],
            },
        });
    });

    it('should render the component correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

});
