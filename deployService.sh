printf "\n----> Deploying startup\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf dist
mkdir dist
cp -r public dist
cp *.js dist
cp package* dist

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh buildaburger << ENDSSH
rm -rf services/startup
mkdir -p services/startup
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r dist/* buildaburger:services/startup

# Step 4
printf "\n----> Deploy the service on the target\n"
ssh buildaburger << ENDSSH
cd services/startup
npm install
pm2 restart startup
ENDSSH

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf dist
