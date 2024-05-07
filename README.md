# **MultiversX dApp based on Next.js and @multiversx/sdk-dapp**

This project is a customizable template for developing decentralized applications on the MultiversX blockchain, built using Next.js and incorporating the `@multiversx/sdk-dapp`. The template utilizes [TailwindCSS](https://tailwindcss.com/) for styling and [Shadcn](https://github.com/shadcn) UI components to ensure a modern and responsive user interface. It is based on the official [MultiversX dApp template](https://template-dapp-nextjs.multiversx.com/), where you can find a live demo.

### Setup next.config.js
To ensure proper compilation of the `@multiversx/sdk-dapp` package, update your `next.config.js` as follows:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@multiversx/sdk-dapp']
};

module.exports = nextConfig;
```
-------------------------------------------------------------------------------

## Getting Started

Run the development server on the desired network:
```bash
yarn start-testnet
```
or
```bash
yarn start-devnet
```
or
```bash
yarn start-mainnet
```

To create a production build:
```bash
yarn build-testnet
```
or
```bash
yarn build-devnet
```
or
```bash
yarn build-mainnet
```
and then
```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

