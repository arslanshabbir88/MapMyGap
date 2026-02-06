// Debug script to check subscription data
// Run this in your browser console on mapmygap.com

// Check what the API is returning
fetch('/api/check-subscription', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('supabase.auth.token')}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('🔍 API Response:', data);
  console.log('🔍 Subscription:', data.subscription);
  console.log('🔍 User ID:', data.userId);
})
.catch(error => {
  console.error('❌ API Error:', error);
});

// Check Supabase directly (if you have access)
// This will show what's actually in your database

