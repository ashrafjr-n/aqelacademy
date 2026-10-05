#!/usr/bin/env bash
# Daily encrypted data backup: pg_dump (data only) → gzip → AES-256 (openssl) → an rclone remote.
# The remote is named "backup" (today the academy's Google Drive; R2 or any other rclone storage
# works by changing only the rclone config). Copies older than 30 days are deleted for good, as the
# privacy policy promises. The schema lives in supabase/migrations, so only data is dumped.
# Restore: see "Backups" in README.md.
#
# Env: SUPABASE_DB_URL, BACKUP_PASSPHRASE, and for the upload RCLONE_CONFIG (path to an rclone config
# with a "backup" remote). BACKUP_DRY_RUN=1 skips the upload.
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

: "${RCLONE_CONFIG:?}"
folder="backup:aqelacademy-backups"
rclone copyto "$file" "$folder/$file"
# --drive-use-trash=false: on Google Drive, delete for good instead of keeping 30 more days in the trash.
rclone delete "$folder" --min-age 30d --drive-use-trash=false
echo "Uploaded $file"
