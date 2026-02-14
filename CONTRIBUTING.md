# Contributing to Xelan Sports

Thank you for your interest in contributing to Xelan Sports! 🎉

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/xelan-sports.git
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Workflow

### Setup
```bash
npm install
cp .env.example .env.local  # Add your Firebase credentials
npm run dev
```

### Before Committing
```bash
npm run build  # Ensure build passes
```

## 🎯 Contribution Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code patterns
- Add JSDoc comments for complex functions
- Use meaningful variable names

### Component Guidelines
- Use functional components with hooks
- Implement error boundaries for critical components
- Add loading states (use skeleton components)
- Ensure responsive design

### Commit Messages
Follow conventional commits:
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure build passes**
4. **Update CHANGELOG.md**
5. **Create PR** with clear description

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🐛 Reporting Bugs

### Bug Report Template
```markdown
**Describe the bug**
Clear description

**To Reproduce**
Steps to reproduce

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- Browser: [e.g., Chrome 120]
- Device: [e.g., iPhone 12]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
Description

**Describe the solution**
What you'd like to see

**Additional context**
Any other information
```

## 📁 Project Structure

```
xelan-sports/
├── app/              # Next.js pages
├── components/       # React components
├── lib/             # Utilities
├── scripts/         # Python scripts
└── docs/            # Documentation
```

## 🧪 Testing

Currently, the project doesn't have automated tests. Contributions to add testing are welcome!

### Future Testing Goals
- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright

## 📝 Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for system changes
- Add JSDoc comments for new utilities
- Update CHANGELOG.md

## 🔒 Security

- Never commit `.env.local` or credentials
- Use environment variables for secrets
- Report security issues privately

## 📞 Questions?

- Open an issue for questions
- Check existing issues first
- Be respectful and constructive

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing! 🙏**
