const mongoose = require('mongoose');

// Test multiple connection scenarios
const testConnections = [
  {
    name: "Local Environment",
    uri: process.env.MONGODB_URI
  },
  {
    name: "Without Database Name",
    uri: "mongodb+srv://ForusBlog:blog123@cluster0.fnc2nw8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  },
  {
    name: "With Database Name",
    uri: "mongodb+srv://ForusBlog:blog123@cluster0.fnc2nw8.mongodb.net/blogapp?retryWrites=true&w=majority&appName=Cluster0"
  }
];

async function testConnection(config) {
  console.log(`\n🔍 Testing: ${config.name}`);
  console.log(`📝 URI: ${config.uri?.substring(0, 50)}...`);
  
  try {
    await mongoose.connect(config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      bufferMaxEntries: 0
    });
    
    console.log(`✅ ${config.name}: Connected successfully!`);
    
    // Try to perform a simple operation
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log(`✅ ${config.name}: Database operation successful!`);
    
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.log(`❌ ${config.name}: Failed - ${error.message}`);
    try {
      await mongoose.disconnect();
    } catch (e) {}
    return false;
  }
}

async function runTests() {
  console.log('🚀 MongoDB Connection Test Suite\n');
  
  for (const config of testConnections) {
    if (config.uri) {
      const success = await testConnection(config);
      if (success) {
        console.log(`\n🎉 Found working configuration: ${config.name}`);
        break;
      }
    } else {
      console.log(`⚠️ Skipping ${config.name}: No URI provided`);
    }
  }
  
  console.log('\n🏁 Test complete');
  process.exit(0);
}

runTests().catch(console.error);