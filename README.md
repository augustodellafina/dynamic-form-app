# 🎯 Dynamic Form Generator

> A modern React application that generates dynamic forms with real-time validation and a clean UI.

## 🌟 Overview

This project showcases a dynamic form generation system built with React, TypeScript, and Material-UI. It demonstrates modern web development practices and clean architecture principles.

## 🏗️ Architecture

The application follows a component-based architecture with these key features:

- 🔄 Dynamic form generation from JSON configuration
- 🎨 Reusable UI components with consistent styling
- ✨ Real-time form validation
- 🔌 Pluggable company configurations

### Key Components

```
src/
├── components/
│   ├── Select/           # Reusable select component
│   ├── FormGenerator/    # Dynamic form renderer
│   └── CompanySelector/  # Company selection handling
├── styles/
│   └── theme.ts         # Global styling and theming
├── utils/
│   └── validation.ts    # Form validation utilities
└── config/
    └── companies.json   # Company configurations
```

## 🧩 Design Patterns & Best Practices

### SOLID Principles
- **Single Responsibility**: Each component has one specific purpose
- **Open/Closed**: Easy to extend with new form fields without modifying existing code
- **Interface Segregation**: Components accept only the props they need
- **Dependency Inversion**: Components depend on abstractions, not concrete implementations

### React Best Practices
- 🔄 Controlled components for form handling
- 🎣 Custom hooks for business logic
- 🏷️ TypeScript for type safety
- 🎨 Styled components for maintainable CSS
- 📝 Prop validation using TypeScript interfaces

## 🚀 Getting Started

1. **Clone & Install**
```bash
git clone https://github.com/augustodellafina/dynamic-form-app.git
cd dynamic-form-app
npm install
```

2. **Development**
```bash
npm run dev
```

3. **Building**
```bash
npm run build
```

## 💡 Features

### Form Generation
- 📝 Dynamic field generation
- 🔍 Real-time validation
- 🎨 Consistent styling
- 📱 Responsive design

### Validation Rules
- ✉️ Email format validation
- 🔒 Required field checking
- 📏 Length validation
- 🎯 Pattern matching

### UI Components
- 🔄 Custom Select component
- 📝 Input fields with icons
- 📋 Textareas
- 🚨 Error messages
- ✅ Success notifications

## 🛠️ Technical Stack

- **React 18** with TypeScript
- **Material-UI** for component library
- **Styled Components** for styling
- **Vite** for build tooling

## 🔍 Code Quality

- 💯 TypeScript for type safety
- 🧹 ESLint for code quality
- 💅 Prettier for code formatting
- 🧪 Jest for testing

## 📈 Future Improvements

- [ ] Add more field types
- [ ] Implement field dependencies
- [ ] Add form state persistence
- [ ] Create form templates
- [ ] Add animation effects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Augusto Dellafina 👑
