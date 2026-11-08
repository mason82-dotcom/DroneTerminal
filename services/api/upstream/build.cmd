rmdir /q/s dist
mkdir dist
robocopy "public" "dist/public" /E /NP /NFL /NJH /NJS /NS /NC /NDL
robocopy "src/mail/mail_templates" "dist/mail/mail_templates" /E /NP /NFL /NJH /NJS /NS /NC /NDL
robocopy "src/mail/mail_templates_configurations" "dist/mail/mail_templates_configurations" /E /NP /NFL /NJH /NJS /NS /NC /NDL

::call npx.cmd @redocly/cli bundle public@latest -o bundled.yaml
::call npx.cmd @redocly/cli build-docs bundled.yaml
::move "redoc-static.html" "dist/public/docs.html"

call npx.cmd tsc --build --force --verbose

echo build done
