import { defineStore } from "pinia";
import type { ThemeModel } from "@/models/ThemeModel";

export const useThemeStore = defineStore({
    id: 'theme',
    state: () : ThemeModel => ({
        isDark: false,
        mode: 'LightMode'
    }),
    actions: {
        toggleTheme() {
            this.isDark = !this.isDark;
            this.mode = this.isDark ? 'DarkMode' : 'LightMode';
        }
    }
})