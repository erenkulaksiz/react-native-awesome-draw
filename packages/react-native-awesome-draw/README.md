# react-native-awesome-draw

> A simple-yet-powerful drawing library for React Native, powered by react-native-reanimated for silky-smooth performance.

[![npm version](https://img.shields.io/npm/v/react-native-awesome-draw.svg)](https://www.npmjs.com/package/react-native-awesome-draw)
[![license](https://img.shields.io/npm/l/react-native-awesome-draw.svg)](https://github.com/yourusername/react-native-awesome-draw/blob/main/LICENSE)

## 🚀 Key Features

- **🎯 Ready-to-use** - Drop-in Canvas component that works out of the box
- **⚡ Buttery smooth** - Drawing happens in the UI thread for zero lag
- **🎨 Fully customizable** - Style and configure everything to match your needs
- **🔧 Path optimization** - Optional feature to reduce path points and improve performance
- **📱 Modern React Native** - Built with the latest tools and best practices

## 📋 Requirements

| Package | Version |
|---------|---------|
| React Native | 0.81.5+ |
| React Native Reanimated | 4.1.1+ |
| React Native SVG | 15.12.1+ |
| React Native Gesture Handler | 2.28.0+ |

> **Note:** Currently tested with the latest React Native version. Support for older versions is coming soon.

## 📦 Installation

```bash
npm install 
```

Quick start with Expo:

```bash
npx expo install react-native-awesome-draw react-native-reanimated react-native-svg react-native-gesture-handler
```

## 🎯 Quick Start

Here's a minimal example to get you started:

```tsx
import { useState } from "react";
import { View } from "react-native";
import { Canvas, type PathData } from "react-native-awesome-draw";

export default function Example() {
  const [paths, setPaths] = useState<PathData[]>([]);

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        paths={paths}
        onDrawEnd={(path) => setPaths((prev) => [...prev, path])}
      />
    </View>
  );
}
```

## 📖 API Reference

### Canvas Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `paths` | `PathData[]` | No | Array of path objects to render |
| `onDrawStart` | `() => void` | No | Callback function when drawing starts |
| `onDrawEnd` | `(path: PathData) => void` | No | Callback function when drawing ends |
| `isDrawingEnabled` | `boolean` | No | Whether drawing is enabled |
| `isPathOptimized` | `boolean` | No | Whether path optimization is enabled |
| `strokeColor` | `string` | No | Stroke color |
| `strokeWidth` | `number` | No | Stroke width |
| `livePathProps` | `Omit<PathProps, "animatedProps">` | No | Props for the live path |
| `savedPathsProps` | `Omit<SavedPathsProps, "paths">` | No | Props for the saved paths |
| `svgProps` | `SvgProps` | No | Props for the SVG |
| `distanceThreshold` | `number` | No | Distance threshold for path optimization |

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests

**[Open an issue →](https://github.com/erenkulaksiz/react-native-awesome-draw/issues/new)**

## 📄 License

MIT © [Eren Kulaksiz](https://github.com/erenkulaksiz)

---

<p align="center">
  Made with ❤️ for the React Native community
</p>