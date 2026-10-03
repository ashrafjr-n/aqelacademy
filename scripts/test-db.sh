#!/usr/bin/env bash
# Runs the Supabase migrations and security tests against a throwaway local Postgres.
# Needs the Postgres binaries (initdb, pg_ctl, psql) on PATH. No Docker.
set -euo pipefail
cd "$(dirname "$0")/.."
export LC_ALL=C # macOS: postmaster refuses to start without a valid locale

dir=$(mktemp -d)
port=54329
initdb -U postgres -E UTF8 --locale=C -A trust -D "$dir" >/dev/null
pg_ctl -D "$dir" -o "-p $port -k $dir -c listen_addresses=''" -l "$dir/postgres.log" -w start >/dev/null
trap 'pg_ctl -D "$dir" -m immediate stop >/dev/null; rm -rf "$dir"' EXIT

run() { psql -h "$dir" -p "$port" -U postgres -d postgres -v ON_ERROR_STOP=1 -q -f "$1"; }

run supabase/rls-tests/supabase-shim.sql
for migration in supabase/migrations/*.sql; do run "$migration"; done
run supabase/rls-tests/rls.test.sql >/dev/null
echo "✓ All database security tests passed."
