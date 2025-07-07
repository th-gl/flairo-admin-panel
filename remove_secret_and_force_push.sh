#!/bin/bash
# This script will remove amplify/backend/serviceAcount.json from git history, add it to .gitignore, and force-push your branch.
# USAGE: bash remove_secret_and_force_push.sh <branch-name>

set -e

SECRET_FILE="amplify/backend/serviceAcount.json"
BRANCH_NAME=${1:-$(git rev-parse --abbrev-ref HEAD)}

if [ ! -f ".git" ]; then
  echo "Run this script from the root of your git repository."
  exit 1
fi

echo "[1/4] Removing $SECRET_FILE from git history..."
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch $SECRET_FILE" --prune-empty --tag-name-filter cat -- --all

echo "[2/4] Adding $SECRET_FILE to .gitignore..."
grep -qxF "$SECRET_FILE" .gitignore || echo "$SECRET_FILE" >> .gitignore
git add .gitignore
git commit -m "Add $SECRET_FILE to .gitignore" || echo "No changes to commit for .gitignore."

echo "[3/4] Force pushing to origin/$BRANCH_NAME..."
git push origin --force $BRANCH_NAME

echo "[4/4] Done! $SECRET_FILE has been removed from history and branch force-pushed."
echo "If you have collaborators, tell them to re-clone or reset their local branches." 