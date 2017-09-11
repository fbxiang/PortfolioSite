rm -r ./build
tsc -p backend
ng build --prod
cp -r backend/dist/out-tsc/ ./build
cp -r backend/static/ ./build/static
cp -r dist/ ./build/frontend
