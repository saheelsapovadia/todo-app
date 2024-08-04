#!/bin/bash

# Replace with the actual path to your React project
REACT_PROJECT_DIR="./frontend"

# Change to the React project directory
cd "$REACT_PROJECT_DIR"

# Build the React project
npm run build

# Copy the built files to the target directory
cp -r dist/* ../src/frontend
