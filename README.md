# Roadside Payments Validation Package

## Description
An NPMJS package for centralised validation required by RSP. This package is built on Node.JS version 16.17.

This package is also available at: https://www.npmjs.com/package/@dvsa/rsp-validation

## Installation
If using Node.JS:

    npm i @dvsa/rsp-validation

## Instructions for running locally
### Set correct Node.JS version

    nvm use 16.17

### Install required dependencies

    npm i

### Build the the package

    npm run build

### Running unit tests

    npm test

## Publishing Package

Uses GitHub to package and release. GitHub will create a release job merge requests which bumps the version in the package.json based on the conventional commits. If there are breaking changes, make sure the commit specifies this.

Merging the release PR will trigger the release action which publishes a new version to NPM automatically. NPM token must be in GitHub with permission to publish to DVSA npm org.