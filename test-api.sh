#!/bin/bash

echo "🔧 Testing API Endpoints"
echo "========================"
echo ""

# Test topic creation
echo "1. Testing topic creation..."
TOPIC_RESPONSE=$(curl -s -X POST http://localhost:3000/api/topics \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Topic"}')

if echo "$TOPIC_RESPONSE" | grep -q '"title":"Test Topic"'; then
    echo "✅ Topic creation works"
    TOPIC_ID=$(echo "$TOPIC_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "   Created topic with ID: $TOPIC_ID"
else
    echo "❌ Topic creation failed"
    echo "   Response: $TOPIC_RESPONSE"
fi

echo ""

# Test question creation
echo "2. Testing question creation..."
QUESTION_RESPONSE=$(curl -s -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Question", "topic_id": "1", "votes": 0}')

if echo "$QUESTION_RESPONSE" | grep -q '"title":"Test Question"'; then
    echo "✅ Question creation works"
    QUESTION_ID=$(echo "$QUESTION_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "   Created question with ID: $QUESTION_ID"
else
    echo "❌ Question creation failed"
    echo "   Response: $QUESTION_RESPONSE"
fi

echo ""

# Test voting
echo "3. Testing voting..."
VOTE_RESPONSE=$(curl -s -X POST http://localhost:3000/api/questions/vote \
  -H "Content-Type: application/json" \
  -d '{"questionId": "demo-1", "action": "upvote"}')

if echo "$VOTE_RESPONSE" | grep -q '"action":"upvote"'; then
    echo "✅ Voting works"
else
    echo "❌ Voting failed"
    echo "   Response: $VOTE_RESPONSE"
fi

echo ""
echo "🎯 All API endpoints should now work without database!"
echo "   Try creating a new topic at: http://localhost:3000/ui/topics/new"