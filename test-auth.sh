#!/bin/bash

echo "🔐 Testing Atlas Authentication"
echo "================================"
echo ""

echo "1. Testing homepage access (should work)..."
if curl -s http://localhost:3000 | grep -q "Welcome to Atlas"; then
    echo "✅ Homepage accessible"
else
    echo "❌ Homepage not accessible"
fi

echo ""
echo "2. Testing login page access (should work)..."
if curl -s http://localhost:3000/login | grep -q "Sign in to your account"; then
    echo "✅ Login page accessible"
else
    echo "❌ Login page not accessible"
fi

echo ""
echo "3. Testing UI page without authentication (should redirect)..."
UI_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ui)
if [ "$UI_RESPONSE" = "200" ]; then
    echo "❌ UI page accessible without login (should be protected)"
elif [ "$UI_RESPONSE" = "302" ] || [ "$UI_RESPONSE" = "307" ]; then
    echo "✅ UI page redirects without authentication"
else
    echo "⚠️  UI page returned HTTP $UI_RESPONSE"
fi

echo ""
echo "🔑 Demo Credentials:"
echo "   Email: user@atlasmail.com"
echo "   Password: 123456"
echo ""
echo "📝 To test login:"
echo "   1. Visit http://localhost:3000"
echo "   2. Click 'Log In'"
echo "   3. Use the demo credentials above"
echo "   4. You should be redirected to /ui dashboard"
echo ""