# apparat/ui

> Tactile UI components designed for building high-precision creative tools, editors, and canvas apps. Inspired by Dieter Rams' design principles.

An open-source UI component library designed specifically for modern creative software, graphic tools, node graphs, motion editors, and canvas workspaces.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It emphasizes tactile micro-interactions, scrubbable numeric inputs, directional spring physics, and an ultra-clean monospace aesthetic using standard theme tokens.

![apparat/ui Example](https://raw.githubusercontent.com/tommyjepsen/creative-tool-ui/refs/heads/main/public/creative-tool-ui-example.png)

---

## Design Principles

- **Dieter Rams Inspiration**: Honest, functional, unobtrusive design with minimal clutter, high contrast tactile controls, and subtle purposeful accent indicators.
- **Precision Micro-Typography**: Monospace labels and metadata (`Space Mono`), compact standard `32px` (`h-8`) control heights, and `12px` icon metrics with fine `1px` stroke weights.
- **Fluid Micro-Interactions**: Directional sliding digit counters, scrub-to-drag gestures, interactive cubic-bezier curve handles, and spring layout transitions.
- **Zero Heavy Shadows**: Clean borderless or subtle-border cards with refined contrast between light and dark modes.
- **Strict Theme Alignment**: Powered entirely by CSS variable tokens (`background`, `card`, `popover`, `foreground`, `border`, `accent`), featuring an energetic Tailwind `orange-600` accent.

---

## Component Catalog

### 1. Atoms (7)
Foundational visual and interactive primitives:
- **`Label`**: Monospace uppercase property and section labels with subtle tracking.
- **`CreativeButton`**: Micro-button with `default`, `secondary`, `accent`, `outline`, and `ghost` variants plus icon support.
- **`SlidingNumber`**: Spring-powered directional digit roller (numbers slide up/down depending on increment or decrement).
- **`DotPattern`**: SVG-based repeating grid background for canvas viewports and preview areas.
- **`StatusBadge`**: Pill badge indicating engine, rendering, or sync state with integrated status dot indicator.
- **`StatusDot`**: Pulsing multi-variant activity dot (`online`, `rendering`, `accent`, `error`, `draft`).
- **`MicroKbd`**: Compact keyboard shortcut tag for modifier keys and tool shortcuts (`⌘`, `Shift`, `P`).

### 2. Molecules (21)
Micro-interactive tool controls built from atoms:
- **`CreativeSlider`**: Continuous scrub slider with bottom-pinned ruler tick lines, scrub feedback, and sliding digit counter.
- **`CreativeNumberInput`**: Horizontal click-and-drag scrubber with inline transparent text editing fallback and optional units (`px`, `%`, `ms`, `°`).
- **`CreativeSelect`**: Compact dropdown selector with active indicators and built-in label container enclosure.
- **`CreativeToggle`**: Smooth spring-animated pill toggle switch with optional container label.
- **`CreativeColorPicker`**: Color swatch with live hex input and copy/edit support.
- **`CreativeColorPopover`**: Two-row palette picker with floating hover hex badges and popover flyout.
- **`CreativeTextInput`**: Non-shrinking pinned property label with editable inline text input and overflow tooltip detection.
- **`CreativeTextareaPopover`**: Popover multiline prompt editor with live character counting, max limit caps, and `Save ⌘+` shortcut indicators.
- **`CreativeSegmentedControl`**: Pill tab switch featuring Framer Motion layout springs and contextual tooltips.
- **`CreativeEasingCurve`**: Interactive SVG cubic bezier curve editor with draggable handles, coordinate readouts, presets, and a live timing animation runner track.
- **`CreativeAngleKnob`**: Circular drag-to-rotate knob dial with tick marks, degree angle readout, and 45° snapping with `Shift`.
- **`CreativeRangeSlider`**: Dual-handle interval slider for selecting min/max ranges with active highlight fill.
- **`CreativeBoxModel`**: Multi-dimensional box model input for linked/unlinked 4-sided dimensions (`Top`, `Right`, `Bottom`, `Left`).
- **`CreativeGradientSlider`**: Multi-stop gradient ramp bar with double-click stop addition, drag offsets, and per-stop hex color selection.
- **`CreativeAlignmentMatrix`**: 9-point grid alignment picker (`top-left`, `center`, `bottom-right`, etc.) with spring indicator.
- **`CreativeSpringPhysics`**: Interactive spring curve visualizer with live tension, friction, and mass response sliders.
- **`CreativeHistogramLevels`**: Levels histogram scrubber with black point, midtone gamma, and white point pins over a subtle range tint.
- **`CreativeFontPicker`**: Visual typography selector showing font family previews, weights, and monospace indicators.
- **`CreativeMaskControl`**: Layer masking controls for invert, feather, alpha mode, and channel thresholds.
- **`CreativeAudioWaveform`**: Audio track amplitude waveform preview with interactive scrub playhead.
- **`CreativeNodeItem`**: Graph node component with input/output pin ports, header badges, and embedded parameter controls.

### 3. Organisms (8)
Complex tool panels and control bars composed of molecules:
- **`PropertyInspector`**: Inspector panel organizing identity, transform coordinates, align controls, appearance styling, and actions.
- **`FloatingToolbar`**: Figma-style floating canvas dock with creation tools (`Cursor`, `Rectangle`, `Pen`, `Text`, `Hand`) and layout view stage switcher (`Split`, `Columns`, `Grid`).
- **`MotionSidebar`**: Physics engine sidebar for configuring spring dynamics (`Stiffness`, `Damping`, `Mass`), bezier curves, duration/delay timing, and triggers.
- **`LayerTree`**: Hierarchical scene graph panel with nested artboard/layer nodes, expand/collapse, active selection, and hover eye/lock toggles.
- **`KeyframeTimeline`**: Transport player timeline dock with frame scrubber playhead (`00:00:xx`), diamond keyframe tracks, and step/add controls.
- **`ToolCommandPalette`**: Quick `⌘K` spotlight command palette with keyboard navigation, hotkey tags, and category filtering.
- **`ShaderNodeGraph`**: Centered shader node interface with straight-line wire connectors, interactive math formulas, and resting pin terminals.
- **`ExportPresetsDialog`**: Modal dialog for asset export configurations (format presets, scale factors, color space, and metadata toggles).

### 4. Templates (4)
Full-page composite editor experiences:
- **`CanvasEditor`**: Complete responsive canvas studio layout combining the sidebar inspector, dot pattern grid, floating dock, and transformable canvas viewport.
- **`MotionVideoEditor`**: 16:9 motion design environment with curve physics sidebar, video preview viewport, render settings, and bottom keyframe timeline.
- **`VectorDrawingEditor`**: Vector artboard editor featuring a Dieter Rams-inspired dot composition, path styling inspector, layer tree, and floating pen dock.
- **`WorkflowNodeBuilder`**: Node-based creative pipeline editor connecting procedural noise generators into image shader nodes with live parameter controls.

---

## Directory Structure

```
src/components/tool-ui/
├── atoms/
│   ├── creative-button.tsx
│   ├── dot-pattern.tsx
│   ├── label.tsx
│   ├── micro-kbd.tsx
│   ├── sliding-number.tsx
│   ├── status-badge.tsx
│   └── status-dot.tsx
├── molecules/
│   ├── creative-alignment-matrix.tsx
│   ├── creative-angle-knob.tsx
│   ├── creative-audio-waveform.tsx
│   ├── creative-box-model.tsx
│   ├── creative-color-picker.tsx
│   ├── creative-color-popover.tsx
│   ├── creative-easing-curve.tsx
│   ├── creative-font-picker.tsx
│   ├── creative-gradient-slider.tsx
│   ├── creative-histogram-levels.tsx
│   ├── creative-mask-control.tsx
│   ├── creative-node-item.tsx
│   ├── creative-number-input.tsx
│   ├── creative-range-slider.tsx
│   ├── creative-segmented-control.tsx
│   ├── creative-select.tsx
│   ├── creative-slider.tsx
│   ├── creative-spring-physics.tsx
│   ├── creative-text-input.tsx
│   ├── creative-textarea-popover.tsx
│   └── creative-toggle.tsx
├── organisms/
│   ├── export-presets-dialog.tsx
│   ├── floating-toolbar.tsx
│   ├── keyframe-timeline.tsx
│   ├── layer-tree.tsx
│   ├── motion-sidebar.tsx
│   ├── property-inspector.tsx
│   ├── shader-node-graph.tsx
│   └── tool-command-palette.tsx
├── templates/
│   ├── canvas-editor.tsx
│   ├── motion-video-editor.tsx
│   ├── vector-drawing-editor.tsx
│   └── workflow-node-builder.tsx
└── index.ts
```

---

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tommyjepsen/creative-tool-ui.git
cd creative-tool-ui
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

## Author

Created by [Tommy Jepsen](https://github.com/tommyjepsen) — [@tommy_jepsen](https://x.com/tommy_jepsen) / [LinkedIn](https://www.linkedin.com/in/toje).

---

## License

MIT
