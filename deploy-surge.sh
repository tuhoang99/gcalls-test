# Build reactjs app with production mode
yarn build

# Move to build folder
cd build

# Clone index.html into 200.html
cp index.html 200.html

# Save deploying via Surge
# The command means deploy current folder to domain gcalls_test.surge.sh
surge . gcalls_test.surge.sh