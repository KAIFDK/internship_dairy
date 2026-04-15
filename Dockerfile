# Use official Playwright image — has all browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Install Playwright browsers
RUN npx playwright install chromium

# Copy all project files
COPY . .

# Expose port (for report serving)
EXPOSE 8080

# Default command: run the tests
CMD ["npx", "playwright", "test", "tests/test-working.spec.ts", "--project=chrome"]
