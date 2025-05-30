# CVGenie - Professional Resume Builder

CVGenie is a modern, feature-rich resume builder application that helps professionals create stunning, ATS-friendly resumes with ease. Built with React and TypeScript, CVGenie offers multiple templates, real-time previews, and analytics to help you create the perfect resume for your job applications.

## ✨ Features

- **Multiple Resume Templates**: Choose from Classic, Modern, Creative, Minimal, and Tech templates
- **Real-time Preview**: See changes to your resume in real-time
- **Section Management**: Easily add, edit, and reorder resume sections
- **Resume Analytics**: Get insights into your resume's strengths and areas for improvement
- **PDF Export**: Download your resume as a professional PDF document
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme
- **Data Persistence**: Save your resume data locally

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API & Custom Hooks
- **Charts**: React-Chart.js for analytics
- **PDF Generation**: Custom PDF utilities
- **UI Components**: Headless UI components with custom styling
- **Animations**: Three.js for background effects

## 📋 Prerequisites

- Node.js (v16 or later)
- npm or yarn

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chavhanprasanna/CVGenie.git
   cd CVGenie
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📖 Usage

1. **Personal Information**: Fill in your basic details like name, contact information, and social links
2. **Professional Summary**: Create a compelling summary that highlights your expertise
3. **Work Experience**: Add your work history with detailed descriptions of responsibilities and achievements
4. **Education**: Include your educational background
5. **Skills**: Add technical and soft skills with proficiency levels
6. **Projects**: Showcase your key projects with descriptions and links
7. **Section Ordering**: Customize the order of sections based on your preferences
8. **Template Selection**: Choose a template that best represents your professional style
9. **Preview & Export**: Review your resume and download it as a PDF

## 📁 Project Structure

```
CVGenie/
├── public/             # Static assets
├── src/                # Source files
│   ├── components/     # React components
│   │   ├── Charts/     # Analytics charts components
│   │   ├── Dashboard/  # Dashboard components
│   │   ├── ResumeBuilder/ # Form components for resume sections
│   │   ├── ResumePreview/ # Resume template components
│   │   └── ui/         # Reusable UI components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── .gitignore          # Git ignore file
├── index.html          # HTML entry point
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🔧 Configuration

You can customize various aspects of the application by modifying the following files:

- **Tailwind Configuration**: Edit `tailwind.config.js` to customize theme colors, fonts, etc.
- **Vite Configuration**: Modify `vite.config.ts` for build optimizations and plugins

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Prasanna Chavhan - [GitHub](https://github.com/chavhanprasanna)

---

Made with ❤️ by Prasanna Chavhan
