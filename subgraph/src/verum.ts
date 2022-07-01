import { BigInt } from "@graphprotocol/graph-ts"
import {
  Verum,
  attestationPosted,
  contentPosted
} from "../generated/Verum/Verum"
import { Attestation, Post } from "../generated/schema"

export function handleattestationPosted(event: attestationPosted): void {
  let attestation = new Attestation(event.transaction.from.toHex())
  attestation.blockNumber = event.block.number;
  attestation.attestor = event.params.attestor;
  attestation.profile = event.params.profile
  attestation.save()
}

export function handleContentPosted(event: contentPosted): void {
  let post = new Post(event.params.id.transaction.toHex())
  post.blockNumber = event.block.number;
  post.contentURI = event.params.contentURI;
  post.save()
}
