#!/bin/bash

# Usage: ./release.sh 1.0.4

set -e

if [ -z "$1" ]; then
  echo "❌ Error: Version number required. Usage: ./release.sh 1.0.4"
  exit 1
fi

VERSION=$1
TAG="v$VERSION"
BRANCH="release/$VERSION"

echo "📦 Updating version to $VERSION in package.json..."

# Update version in package.json
npm version $VERSION --no-git-tag-version

# Create a release branch
echo "🌿 Creating release branch: $BRANCH"
git checkout -b $BRANCH

# Commit version bump
# git add package.json package-lock.json
git add .
git commit -m "🔖 Bump version to $VERSION"

# Tag the release
echo "🏷️ Creating git tag: $TAG"
git tag -a $TAG -m "Release version $VERSION"

# Push branch and tag
echo "🚀 Pushing branch $BRANCH and tag $TAG to origin"
git push origin $BRANCH
git push origin $TAG

echo "✅ Done. GitHub Actions will now build and release version $VERSION."
