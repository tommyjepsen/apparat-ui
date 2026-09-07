# Creative tool UI

> The UI Components for built for creating a better experience of using your creative tools.

An open-source UI component library designed specifically for building modern, high-precision **creative tools**, editors, canvas workspaces, and developer interfaces.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It emphasizes tactile micro-interactions, scrubbable numeric inputs, directional spring physics, and an ultra-clean monospace aesthetic using standard `shadcn` theme tokens.

![Creative tool UI Example](https://raw.githubusercontent.com/tommyjepsen/creative-tool-ui/refs/heads/main/public/creative-tool-ui-example.png)

---

## Design Principles

- **Precision Micro-Typography**: Monospace labels and metadata (`Space Mono`), compact standard `32px` (`h-8`) control heights, and `12px` icon metrics with fine `1px` stroke weights.
- **Fluid Micro-Interactions**: Directional sliding digit counters, scrub-to-drag gestures, interactive cubic-bezier curve handles, and spring layout transitions.
- **Zero Heavy Shadows**: Clean borderless or subtle-border cards with refined contrast between light and dark modes.
- **Strict Theme Alignment**: Powered entirely by CSS variable tokens (`background`, `card`, `popover`, `foreground`, `border`, `accent`), featuring an energetic Tailwind `orange-600` accent.

---

## Component Catalog

### 1. Atoms
Foundational visual and interactive primitives:
- **`Label`**: Monospace uppercase property and section labels with subtle tracking.
- **`CreativeButton`**: Micro-button with `default`, `secondary`, `accent`, `outline`, and `ghost` variants plus icon support.
- **`SlidingNumber`**: Spring-powered directional digit roller (numbers slide up/down depending on increment or decrement).
- **`DotPattern`**: SVG-based repeating grid background for canvas viewports and preview areas.

### 2. Molecules
Micro-interactive tool controls built from atoms:
- **`CreativeSlider`**: Continuous scrub slider with bottom-pinned ruler tick lines, scrub feedback, and sliding digit counter.
- **`CreativeNumberInput`**: Horizontal click-and-drag scrubber with inline transparent text editing fallback and optional units (`px`, `%`, `ms`, `°`).
- **`CreativeSelect`**: Compact dropdown selector with active indicators and a borderless `variant="ghost"` mode.
- **`CreativeToggle`**: Smooth spring-animated pill toggle switch.
- **`CreativeColorPicker`**: Color swatch with live hex input and copy/edit support.
- **`CreativeColorPopover`**: Two-row palette picker with floating hover hex badges and popover flyout.
- **`CreativeTextInput`**: Non-shrinking pinned property label with editable inline text input and overflow tooltip detection.
- **`CreativeTextareaPopover`**: Popover multiline prompt editor with live character counting, max limit caps, and `Save ⌘+` shortcut indicators.
- **`CreativeSegmentedControl`**: Pill tab switch featuring Framer Motion layout springs and contextual tooltips.
- **`CreativeEasingCurve`**: Interactive SVG cubic bezier curve editor with draggable handles, coordinate readouts, presets, and a live timing animation runner track.

### 3. Organisms
Complex tool panels and control bars composed of molecules:
- **`PropertyInspector`**: Inspector panel organizing identity, transform coordinates, align controls, appearance styling, and actions.
- **`FloatingToolbar`**: Figma-style floating canvas dock with creation tools (`Cursor`, `Rectangle`, `Pen`, `Text`, `Hand`) and layout view stage switcher (`Split`, `Columns`, `Grid`).
- **`MotionSidebar`**: Physics engine sidebar for configuring spring dynamics (`Stiffness`, `Damping`, `Mass`), bezier curves, duration/delay timing, and triggers.

### 4. Templates
Full-page composite editor experiences:
- **`CanvasEditor`**: Complete 16:9 responsive canvas studio layout combining the sidebar inspector, dot pattern grid, floating dock, and transformable canvas viewport.

---

## Directory Structure

```
src/components/tool-ui/
├── atoms/
│   ├── creative-button.tsx
│   ├── dot-pattern.tsx
│   ├── label.tsx
│   └── sliding-number.tsx
├── molecules/
│   ├── creative-color-picker.tsx
│   ├── creative-color-popover.tsx
│   ├── creative-easing-curve.tsx
│   ├── creative-number-input.tsx
│   ├── creative-segmented-control.tsx
│   ├── creative-select.tsx
│   ├── creative-slider.tsx
│   ├── creative-text-input.tsx
│   ├── creative-textarea-popover.tsx
│   └── creative-toggle.tsx
├── organisms/
│   ├── floating-toolbar.tsx
│   ├── motion-sidebar.tsx
│   └── property-inspector.tsx
├── templates/
│   └── canvas-editor.tsx
└── index.ts
```

---

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tommyjepsen/tool-ui.git
cd tool-ui
npm install
```

### Development Server

Start the local Vite development environment:

```bash
npm run dev
```

### Production Build

Type-check and create an optimized production bundle:

```bash
npm run build
```

---

## License

MIT
