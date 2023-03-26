import {expect,describe,it,beforeEach} from "vitest";
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import ChannelParam from '../../components/ChannelParam.vue';

describe('ChannelParam', () => {
    let wrapper;
    const pinia = createPinia();

    beforeEach(() => {
        wrapper = mount(ChannelParam, {
            global: {
                plugins: [pinia],
            },
            props: {
                channel: {
                    name: 'channel1',
                    creator: 'user1',
                    id: 1,
                    users: [],
                    messages: [],
                },
            },
        });
    });

    it('should render the component correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

});
