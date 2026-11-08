rm -rf build
mkdir -p build
cp -R templates build/templates
npx tsc --build --force --verbose