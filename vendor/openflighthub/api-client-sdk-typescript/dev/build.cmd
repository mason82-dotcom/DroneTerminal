rmdir /q/s build
mkdir build
robocopy "templates" "build/templates" /E
npx tsc --build --force --verbose