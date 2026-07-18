# ==============================
# Stage 1: Build the React frontend
# ==============================

# Use the official Node.js 22 Alpine image and name this stage "frontend-builder"
FROM node:22-alpine AS frontend-builder

# Set the working directory inside the container
WORKDIR /app/client

# Copy only package.json and package-lock.json first
# This allows Docker to cache npm install if dependencies haven't changed
COPY client/package*.json ./

# Install all frontend dependencies
RUN npm ci

# Copy the rest of the frontend source code
COPY client/ ./

# Set the environment variable used by Vite during build
# Replace this with your backend URL in production if needed
ENV VITE_API_URL=http://localhost:3000
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
# Build the React application
# This creates the /dist folder
RUN npm run build


# ==============================
# Stage 2: Build the Express backend
# ==============================

# Start another temporary Node.js image for building the backend
FROM node:22-alpine AS backend-builder

# Set the backend working directory
WORKDIR /app/server

# Copy package files first for Docker layer caching
COPY server/package*.json ./

# Install backend dependencies (including devDependencies because TypeScript needs them)
RUN npm ci

# Copy the rest of the backend source code
COPY server/ ./

# Compile TypeScript into JavaScript
# This creates the /dist folder
RUN npm run build


# ==============================
# Stage 3: Production image
# ==============================

# Start with a fresh Node.js image
# This keeps the final image much smaller
FROM node:22-alpine

# Set the working directory
WORKDIR /app/server

# Set Node to production mode
ENV NODE_ENV=production

# Copy backend package files into the production image
COPY server/package*.json ./

# Install ONLY production dependencies
# Dev dependencies (TypeScript, nodemon, etc.) are excluded
RUN npm ci --omit=dev

# Copy the compiled backend files from the backend build stage
COPY --from=backend-builder /app/server/dist ./dist

# Copy the built React application into the final image
# Your Express server should serve this folder as static files
COPY --from=frontend-builder /app/client/dist ../client/dist

# Tell Docker that the application listens on port 3000
EXPOSE 3000

# Start the backend server
CMD ["node", "dist/index.js"]