#!/bin/bash

echo "🔧 Seeding the database..."
echo "Make sure your .env.local file is configured with Vercel database credentials first!"
echo ""

# Check if the development server is running
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Development server is running"
    echo "🌱 Seeding database..."
    
    response=$(curl -s -w "\n%{http_code}" http://localhost:3000/seed)
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$http_code" = "200" ]; then
        echo "✅ Database seeded successfully!"
        echo "$body"
    else
        echo "❌ Failed to seed database (HTTP $http_code)"
        echo "$body"
    fi
else
    echo "❌ Development server is not running"
    echo "Please run 'npm run dev' first"
fi
