rm -rf dist
mkdir -p dist
cp -R public dist/public
mkdir -p dist/mail
cp -R src/mail/mail_templates dist/mail/mail_templates
cp -R src/mail/mail_templates_configurations dist/mail/mail_templates_configurations

#npx @redocly/cli bundle internal@latest -o bundled.yaml
#npx @redocly/cli build-docs bundled.yaml
#mv redoc-static.html api-docs-internal.html

#npx @redocly/cli bundle public@latest -o bundled.yaml
#npx @redocly/cli build-docs bundled.yaml
#mv redoc-static.html dist/public/docs.html

npx tsc --build --force --verbose

echo build done
