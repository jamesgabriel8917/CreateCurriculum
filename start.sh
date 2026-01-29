#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════╗"
echo "║   Curriculum Generator             ║"
echo "║   Local Server Startup              ║"
echo "╚════════════════════════════════════╝"
echo -e "${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}⚠ package.json not found. Installing dependencies...${NC}"
    npm install express docx
else
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""
echo -e "${BLUE}Starting server...${NC}"
echo ""

# Start the server
node server.js
