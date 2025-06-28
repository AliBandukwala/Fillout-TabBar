# Fillout TabBar Component

The goal was to build an interactive **tab bar interface** 

## ✨ Features

- ✅ **Draggable tabs** using `@dnd-kit`
- ✅ **Animated reorder and selection**
- ✅ **Hover-insertable tab buttons** (`+`) between tabs
- ✅ **Popup Settings Menu** (Portal-based, smart positioning)
- ✅ **Accessibility**: keyboard focus indicators & aria labels

## 🧠 Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@dnd-kit](https://dndkit.com/) – drag-and-drop library

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fillout-takehome.git
cd fillout-takehome

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

## 💡 Notes
* The SettingsMenu is rendered using a React Portal to avoid layout shift and clipping inside tabs.
* Positioning of the menu dynamically adjusts based on screen width.
* Clicking outside the menu closes it.