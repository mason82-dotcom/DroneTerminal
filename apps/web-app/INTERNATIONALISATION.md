# Internationalisation in Vue

[https://vue-i18n.intlify.dev/guide/](Vue I18n documentation)

## Show all translation keys in the web-app
Press
```
Ctrl + Shift + D
```

## Editing Translations
Files can be found in the `i18n` folder

You should edit the translations with [https://www.codeandweb.com/babeledit](Babeledit)

### Finding out where the key is being used

search the repository using this regex:
```javascript
\$t\s*\(\s*"actions.create"\s*\)
```

## For developers
Guide: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n

### How to use in components:

#### inside <template>
```html
<div>{{ $t("my.key") }}</div>
```

#### inside <script>
```ts
import {useI18n} from "vue-i18n"
const i18n = inject('i18n') as ReturnType<typeof useI18n>

const translated = i18n.t("my.key")
```

### How to use in standalone ts files
```ts
import {i18nInstance} from "@/main.js"

function abc(){
    const i18n = i18nInstance.global //must be in a function or something (can not be right after the import!)

    const translated = i18n.t("my.key")
}
```