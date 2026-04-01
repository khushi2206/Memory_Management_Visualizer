# Operating System Memory Management Visualizer: Comprehensive Report

## Overview

This project is a React + TypeScript application that demonstrates core memory management concepts used in operating systems. It features interactive visualizations for paging, segmentation, and page replacement algorithms, making it ideal for learning, demos, and presentations.

---

## Table of Contents
1. [Project Features](#project-features)
2. [Paging Simulation](#paging-simulation)
3. [Page Replacement Algorithms](#page-replacement-algorithms)
    - [FIFO](#fifo)
    - [LRU](#lru)
    - [Optimal](#optimal)
4. [Segmentation Visualization](#segmentation-visualization)
5. [Algorithm Comparison](#algorithm-comparison)
6. [Controls and User Interaction](#controls-and-user-interaction)
7. [How the Simulation Works](#how-the-simulation-works)
8. [Run and Build Instructions](#run-and-build-instructions)

---

## Project Features
- Paging with animated frame visualization
- Page replacement algorithms: FIFO, LRU, Optimal
- Segmentation layout (Code, Heap, Stack with base and limit)
- Comparison chart for algorithm page-fault counts
- Step-by-step transitions, auto play, and animation speed control
- Page hit and page fault indicators
- Clean dashboard-style UI

---

## Paging Simulation

Paging divides memory into fixed-size frames and loads pages as needed. The visualization shows:
- Current page request
- Frame contents
- Page hits and faults
- Which page is replaced (if any)

**Diagram:**
```
+-------------------+
| Frame 0 | Page 7  |
| Frame 1 | Page 0  |
| Frame 2 | Page 1  |
+-------------------+
Current request: 2
Page Fault! (Page 2 loaded, Page 7 replaced)
```

---

## Page Replacement Algorithms

### FIFO (First-In, First-Out)
Replaces the oldest loaded page when a fault occurs and no empty frame is available.

**Pseudo-code:**
```
for each page in reference string:
    if page in frames:
        hit
    else if empty frame exists:
        load page
        fault
    else:
        replace oldest page
        fault
```

**Code Excerpt:**
```ts
export function simulateFIFO(reference: number[], frameCount: number): SimulationStep[] {
  // ...existing code...
}
```

### LRU (Least Recently Used)
Replaces the page that has not been used for the longest time.

**Pseudo-code:**
```
for each page in reference string:
    if page in frames:
        update last used
        hit
    else if empty frame exists:
        load page
        fault
    else:
        replace least recently used page
        fault
```

**Code Excerpt:**
```ts
export function simulateLRU(reference: number[], frameCount: number): SimulationStep[] {
  // ...existing code...
}
```

### Optimal
Replaces the page that will not be used for the longest period in the future.

**Pseudo-code:**
```
for each page in reference string:
    if page in frames:
        hit
    else if empty frame exists:
        load page
        fault
    else:
        replace page with farthest next use
        fault
```

**Code Excerpt:**
```ts
export function simulateOptimal(reference: number[], frameCount: number): SimulationStep[] {
  // ...existing code...
}
```

---

## Segmentation Visualization

Segmentation divides memory into variable-sized segments (Code, Heap, Stack). Each segment has a base and limit.

**Diagram:**
```
+-------------------+
|   Code   | Heap  | Stack |
|  Base:1000 Limit:300 ... |
+-------------------+
```

---

## Algorithm Comparison

A bar chart compares the total page faults for FIFO, LRU, and Optimal algorithms.

**Diagram (Bar Chart):**
```
FIFO   | ██████ 12
LRU    | ████   8
Optimal| ███    6
```

---

## Controls and User Interaction

- Input page reference string (e.g., 7,0,1,2,0,3,0,4,2,3)
- Set number of frames
- Select algorithm or enable comparison mode
- Start, step, auto play, reset simulation
- Adjust animation speed

---

## How the Simulation Works

- The app parses the reference string and runs the selected algorithm.
- Each step updates the visualization, showing frame contents, hits, faults, and replacements.
- In comparison mode, all algorithms run in parallel and their results are shown side-by-side.

---

## Run and Build Instructions

To run locally:
```bash
npm install
npm run dev
```

To build:
```bash
npm run build
```

---

## Credits
Developed using React, TypeScript, and Recharts for visualization.

---

*This report was auto-generated to include all major concepts, diagrams, and code structure from the project.*
