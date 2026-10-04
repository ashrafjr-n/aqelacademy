#!/usr/bin/env bash
# Daily encrypted data backup: pg_dump (data only) → gzip → AES-256 (openssl) → Cloudflare R2.
# The schema lives in supabase/migrations, so only data is dumped: our tables plus accounts.
# Restore: see "Backups" in README.md.
#
# Env: SUPABASE_DB_URL, BACKUP_PASSPHRASE, and for the upload R2_ACCOUNT_ID, R2_BUCKET,
# AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (R2 S3 credentials). BACKUP_DRY_RUN=1 skips the upload.
set -euo pipefail
: "${SUPABASE_DB_URL:?}" "${BACKUP_PASSPHRASE:?}"

file="aqelacademy-$(date -u +%Y-%m-%dT%H%M%SZ).sql.gz.enc"

pg_dump "$SUPABASE_DB_URL" --data-only --no-owner --no-privileges \
  --table='public.*' --table='private.*' --table=auth.users --table=auth.identities \
  | gzip -9 \
  | openssl enc -aes-256-cbc -pbkdf2 -iter 600000 -salt -pass env:BACKUP_PASSPHRASE -out "$file"

if [ "${BACKUP_DRY_RUN:-}" = "1" ]; then
  echo "Dry run: wrote $file"
  exit 0
fi

: "${R2_ACCOUNT_ID:?}" "${R2_BUCKET:?}" "${AWS_ACCESS_KEY_ID:?}" "${AWS_SECRET_ACCESS_KEY:?}"
AWS_DEFAULT_REGION=auto aws s3 cp "$file" "s3://$R2_BUCKET/$file" \
  --endpoint-url "https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com" --only-show-errors
echo "Uploaded $file"
