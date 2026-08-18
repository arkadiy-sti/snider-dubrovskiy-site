# Как редактировать сайт в VS Code

Это шпаргалка для тех, кто не программист. Она объясняет, где лежат тексты, фото и контакты, и как их поменять, не трогая остальной код.

---

## 1. Установка (один раз)

1. Установи **VS Code**: https://code.visualstudio.com
2. Установи **Node.js** (LTS-версию): https://nodejs.org — это нужно, чтобы сайт можно было запустить и посмотреть на компьютере до публикации.
3. Открой VS Code → `File → Open Folder…` → выбери папку проекта:
   `Desktop/PRIOR/0.01 Claude /Stepan`

## 2. Запуск сайта для просмотра изменений

В VS Code открой терминал: `Terminal → New Terminal` (или `` Ctrl+` ``).

Первый раз нужно установить зависимости:

```bash
npm install
```

Дальше — при каждой работе — запускай сайт локально:

```bash
npm run dev
```

В терминале появится ссылка:

```
- Local: http://localhost:3000
```

Открой её в браузере. Пока команда `npm run dev` работает в терминале, сайт **сам обновляется** в браузере при каждом сохранении файла (`Cmd+S`) — просто сохрани файл и переключись в браузер.

Чтобы остановить — нажми `Ctrl+C` в терминале.

> ⚠️ Если при запуске видишь предупреждение про "Slow filesystem" или сайт падает без ошибки — это из-за того, что папка проекта синхронизируется iCloud Drive (`~/Desktop`). Напиши разработчику, если это повторяется, — есть быстрый фикс.

---

## 3. Где что менять

Весь контент, который можно менять, вынесен в папку **`data/`**. Туда и нужно заходить — компоненты (папка `components/`) трогать не нужно.

### Тексты сайта, контакты, адрес — `data/siteConfig.ts`

```ts
name: "Snider & Dubrovskiy",        // название школы/бренда
tagline: "Elite Figure Skating Coaching",

contact: {
  generalEmail: "icedance.dk@gmail.com",
  phoneStephanie: "408-833-5570",
  phoneStepan: "669-600-9202",
  instagram: "@beauty_stef",
},

hero: {
  eyebrow: "Sharks Ice · San Jose, California",
  headline: ["We Don't Just", "Teach Skating.", "We Build Champions."], // заголовок на главном экране, каждая строка — отдельный элемент списка
  subheadline: "...",               // подзаголовок под ним
},

cta: {
  primary: "Book a Training Session",  // текст на главной кнопке
  secondary: "Meet the Coaches",
},
```

Меняешь текст между кавычками `"..."` — саму структуру (кавычки, запятые, скобки) не трогай.

### Тренеры — `data/coaches.ts`

Один блок `{ ... }` — один тренер. Можно менять:

```ts
name: "Stepan Dubrovskiy",
role: "Head Coach",
specialty: "Freestyle · Pairs · Triple Jumps",
photo: "/images/coach-stepan.webp",          // какое фото показывать (см. раздел про фото ниже)
bio: "Professional figure skating coach with 10 years...",
background: [                                  // список пунктов "Competitive Background"
  "Junior Worlds & ISU Grand Prix competitor",
  "Danish National Champion",
],
specialties: ["Freestyle", "Pairs", "Triple Jumps", ...],
languages: ["Russian", "English"],
contact: { phone: "669-600-9202", email: "iceskater.rus@gmail.com" },
```

Списки (`background`, `specialties`, `languages`) — каждый пункт в кавычках, через запятую. Можно добавлять/удалять строки.

### Достижения (блок с цифрами) — `data/achievements.ts`

```ts
{ value: "XX+", label: "Competitive Athletes Developed" },
{ value: "XX", label: "Years of Coaching Experience" },
```

Замени `"XX+"` / `"XX"` на реальные цифры, например `"40+"`. `label` — подпись под цифрой.

### Программа тренировок (4 карточки: Technique / Performance / …) — `data/programs.ts`

```ts
{
  id: "technique",
  title: "Technique",
  description: "Edges, jumps, spins, body positioning and technical consistency.",
},
```

Меняй `title` и `description`. `id` не трогай.

### Пункты меню — `data/navigation.ts`

```ts
{ label: "Program", href: "#program" },
```

`label` — текст в меню, `href` — на какой раздел ссылается (`#program`, `#coaches`, `#results`, `#location`) — если меняешь `href`, он должен совпадать с `id` соответствующей секции в коде, поэтому лучше просто менять `label`.

### Выпадающие списки в форме заявки — `data/formOptions.ts`

Уровни катания, стаж, дни недели — списки строк, можно менять/добавлять пункты:

```ts
export const skatingLevels = [
  "Just starting out",
  "Basic Skills / Beginner",
  ...
];
```

### Фото в галерее раздела "Тренеры" — `data/gallery.ts`

```ts
{
  src: "/images/action-shot.webp",
  alt: "Описание фото для скринридеров/SEO",
},
```

---

## 4. Как поменять фото

1. Подготовь новое фото — идеально **`.webp`**, не более ~150–300 КБ (если у тебя `.jpg`/`.png`, можно сконвертировать на https://squoosh.app — просто перетащить файл и скачать webp).
2. Положи файл в папку **`public/images/`**.
3. В соответствующем `data/*.ts`-файле пропиши путь вида `/images/имя-файла.webp` (без `public` в пути — эта часть автоматическая).

Например, чтобы поменять фото Степана — положи файл `public/images/coach-stepan-new.webp` и в `data/coaches.ts` пропиши:
```ts
photo: "/images/coach-stepan-new.webp",
```

Фото тренеров на странице био используют формат **портрет 4:5** (например, 1122×1402 px) — под таким соотношением сторон снимок покажется целиком, без обрезки.

---

## 5. Чего лучше не трогать

- `components/` — верстка и анимации. Ломается легко, чинить сложнее.
- `lib/`, `types/`, `app/` — логика, роутинг, валидация форм.
- `app/globals.css` — глобальные стили и анимации.

Если очень нужно что-то поменять там — сначала спроси разработчика или сделай копию файла перед правкой.

---

## 6. Частые проблемы

**Сайт не обновляется после сохранения** — проверь, что `npm run dev` всё ещё запущен в терминале (нет ли там красной ошибки).

**Terminal пишет "port 3000 already in use"** — где-то уже запущен `npm run dev`. Останови его (`Ctrl+C` в том терминале) или просто открой `http://localhost:3000` — скорее всего, сайт уже работает.

**После правки сайт "упал" с ошибкой в браузере** — почти всегда пропущена кавычка `"` или запятая `,` в `data/*.ts`. Открой файл, найди, где редактировал, и сверь со скобками/запятыми соседних блоков.

**Хочу отменить свою правку** — `Cmd+Z` в VS Code откатывает последние изменения в открытом файле.
