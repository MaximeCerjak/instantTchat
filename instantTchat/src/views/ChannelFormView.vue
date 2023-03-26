<template>
    <div>
        <!-- a formular to create a instant chat channel -->
        <form @submit.prevent="createChannel" class="add-canal">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" />
            <div class="themes-choice-box">
                <div v-for="(theme, index) in themes" :key="theme.id" class="theme-box">
                    <label :for="`theme-${index}`">{{ theme.themeName }}</label>
                    <input type="radio" :id="`theme-${index}`" :value="theme.id" v-model="selectedThemes" />
                    <div class="colors">
                        <div class="colors-box" v-for="color in theme.colors" :key="color">
                            <div class="color-box" :style="{ backgroundColor: color }"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="custom-theme-box">
                <label for="custom-theme">Custom Theme</label>
                <input type="radio" id="custom-theme" value="custom" v-model="selectedThemes" @click="showCustomModal = !showCustomModal"/>
            </div>

            <!--Une modale contenant l'interface de customisation du theme-->
            <div v-if="showCustomModal" class="custom-theme-modal" id="custom-theme-modal">
                <div class="custom-theme-modal-content">
                    <div class="custom-theme-modal-header">
                        <h2>Custom Theme</h2>
                    </div>
                    <div class="custom-theme-options">
                        <div class="color-option" v-for="(colorLabel, index) in customColorLabels" :key="index">
                            <div class="color-preview" :style="{ backgroundColor: customColors[index] }"></div>
                            <div class="color-label">{{ colorLabel }}</div>
                            <input type="color" class="color-input" v-model="customColors[index]" />
                        </div>
                    </div>
                    <div class="custom-theme-modal-footer">
                        <button class="confirm-btn" @click="showCustomModal = !showCustomModal">Valider</button>
                        <button class="close-button" @click="showCustomModal = !showCustomModal">Close</button>
                    </div>
                </div>
            </div>

            <button type="submit">Create</button>
            <button class="close-button" @click="cancel">Cancel</button>
        </form>
        <Channel />
    </div>
</template>

<script setup>
import useChannelStore from '../stores/channel-store.js';
import { ref, reactive } from 'vue';
import Channel from '../components/Channel.vue';
import router from '../router';

const channelStore = useChannelStore();
const selectedThemes = ref([]);

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

const name = ref('');
const users = ref('');
const showCustomModal = ref(false);

const themes = reactive([
    {
        id: 1,
        themeName: 'Dark devil',
        colors: ['#1C1C1E', '#131316 ', '#FF5E5E', '#E5E5E5', '#FFFFFF']
    },
    {
        id: 2,
        themeName: 'Neon Blue',
        colors: ['#262626', '#1A1A1A', '#04D9B2', '#F2F2F2', '#FFFFFF']
    },
    {
        id: 3,
        themeName: 'Sun & beach',
        colors: ['#FFB347', '#E5801D', '#2E8B57', '#FFFFFF', '#F0FFF0']
    },
    {
        id: 4,
        themeName: 'Cartoon sky',
        colors: ['#1E90FF', '#104E8B', '#FF69B4', '#F5F5F5', '#FFFFFF']
    }
]);

const customColorLabels = {
    primary_color: 'PRIMARY',
    primary_color_dark: 'PRIMARY DARK',
    accent_color: 'ACCENT',
    text_color: 'TEXT',
    accent_text_color: 'ACCENT TEXT',
};

const customColors = reactive({
    primary_color: '#2E3440',
    primary_color_dark: '#1E222B',
    accent_color: '#88C0D0',
    text_color: '#ECEFF4',
    accent_text_color: '#D08770',
});

const createChannel = async () => {
    let themeToUse;

    if (selectedThemes.value === 'custom') {
        themeToUse = customColors;
    } else {
        const selectedTheme = themes.find(t => t.id === selectedThemes.value);
        if (selectedTheme) {
            themeToUse = {
                primary_color: selectedTheme.colors[0],
                primary_color_dark: selectedTheme.colors[1],
                accent_color: selectedTheme.colors[2],
                text_color: selectedTheme.colors[3],
                accent_text_color: selectedTheme.colors[4],
            };
        }
    }

    if (!name.value.trim()) {
        alert('Veuillez entrer un nom de canal valide.');
        return;
    }

    const channel = {
        name: name.value,
        img: "https://example.com/image.jpg",
        users: users.value,
    };

    if (themeToUse) {
        channel.theme = themeToUse;
    }

    await channelStore.createChannel(token, channel);
    router.push('/');
};

const cancel = () => {
    router.push('/');
}
</script>

<style scoped>
.add-canal {
    display: flex;
    flex-direction: column;
    padding: 1em;
    background-color : rgb(173, 173, 173);
    width : 500px;
    height: 450px;
    border-radius: 15px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
}

label {
    margin-bottom: 10px;
}

input, button {
    border-style: none;
    border-radius: 5px;
    background-color: rgba(70, 90, 126, 0.4);
    margin-bottom: 20px;
}

input {
    padding: 2px 5px;
}

button {
    background-color:rgb(7, 149, 0);
    color: white;
}

button:hover {
    background-color: rgb(5, 99, 0);
}

.close-button {
    background-color: rgb(200, 0, 0);
    color: white;
}

.close-button:hover {
    background-color: rgb(119, 0, 0);
}

.confirm-btn {
    background-color: rgb(7, 149, 0);
    color: white;
}

.confirm-btn:hover {
    background-color: rgb(5, 99, 0);
}

.theme-box {
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    width: 100%;
    justify-content: space-around;
}

.colors {
    display: flex;
    margin-top: 5px;
}

.color-box {
    width: 20px;
    height: 20px;
    margin:0;
}

.custom-theme-box {
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    width: 100%;
    justify-content: space-around;
}

.custom-colors {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
}

.custom-theme-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-theme-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    height: 70%;
    background-color: rgb(39, 39, 39);
    border-radius: 15px;
}


.custom-theme-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: rgb(214, 214, 214);
}

.custom-theme-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 80%;
    background-color: rgb(116, 116, 116);
    padding: 1rem;
    border-radius: 15px;
}

.color-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.color-preview {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.color-input {
    height: 24px;
    width: 40px;
    border: none;
    cursor: pointer;
}


</style>