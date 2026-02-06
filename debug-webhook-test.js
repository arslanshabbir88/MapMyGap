// Test script to check if webhook is working
// Run this in browser console on mapmygap.com

console.log('🧪 Testing webhook endpoint...');

// Test the webhook endpoint
fetch('https://mapmygap.com/api/test-webhook', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    test: 'webhook',
    timestamp: new Date().toISOString(),
    user: 'test-user'
  })
})
.then(response => response.json())
.then(data => {
  console.log('✅ Test webhook response:', data);
})
.catch(error => {
  console.error('❌ Test webhook error:', error);
});

// Test the subscription check
console.log('🧪 Testing subscription check...');

fetch('/api/check-subscription', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('🔍 Subscription check response:', data);
})
.catch(error => {
  console.error('❌ Subscription check error:', error);
});

// Check if we're on the right domain
console.log('🌐 Current domain:', window.location.hostname);
console.log('🌐 Expected domain: mapmygap.com');
console.log('🌐 Domain match:', window.location.hostname === 'mapmygap.com');



