export function $do<C>(callback: () => C) {
  return callback();
}

export type EthereumAddress = `0x${string}`;

export function isWalletAddress(str: string): str is EthereumAddress {
  return str.startsWith("0x");
}
