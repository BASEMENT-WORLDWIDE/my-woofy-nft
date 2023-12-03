import { getContract } from "viem";
import { woofysABI } from "./abi";
import { publicClient } from "~/vendors/viem";
import { EthereumAddress } from "~/lib/utils";

const WOOFY_CONTRACT_ADDRESS = "0xbacd77ac0c456798e05de15999cb212129d90b70";

export class WoofyContract {
  static contract = getContract({
    abi: woofysABI,
    address: WOOFY_CONTRACT_ADDRESS,
    publicClient,
  });

  static async getRevealStatus(tokenId: string | number) {
    const isRevealed = await WoofyContract.contract.read.isTokenRevealed([
      BigInt(tokenId),
    ]);
    return isRevealed ? "revealed" : "unrevealed";
  }

  static async getTokenIdForRarity(rarity: string | number) {
    const tokenId = await WoofyContract.contract.read.metadataIdToTokenId([
      BigInt(rarity),
    ]);
    return { tokenId: parseInt(tokenId.toString(10)), rarity } as const;
  }

  static async getRarityForTokenId(tokenId: string | number) {
    const rarity = await WoofyContract.contract.read.metadataId([
      BigInt(tokenId),
    ]);
    return parseInt(rarity.toString(10));
  }

  static async getWoofysForOwner(ownerAddress: EthereumAddress) {
    const tokens = await WoofyContract.contract.read.tokensOfOwnerInRange([
      ownerAddress,
      BigInt(1),
      BigInt(5555),
    ]);
    const tokenIds = (tokens.tokenIds as BigInt[])
      .map((tokenId) => parseInt(tokenId.toString(10)))
      .filter((tokenId) => tokenId !== 0);
    const totalOwned = parseInt(tokens.foundCount.toString(10));
    return {
      totalOwned,
      tokenIds,
    } as const;
  }
}
