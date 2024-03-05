import './tailwind.css'
import DefaultTheme from 'vitepress/theme'
import InputWithLabel from './components/InputWithLabel.vue'

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.component('InputWithLabel', InputWithLabel)
    }
}
