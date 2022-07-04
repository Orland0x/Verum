import { BigInt } from "@graphprotocol/graph-ts"
import {
  Verum,
  attestationPosted,
  contentPosted,
  commentPosted
} from "../generated/Verum/Verum"
import { Attestation, Post, Comment, ReputationWrapper, CumulativeReputation } from "../generated/schema"

export function handleAttestationPosted(event: attestationPosted): void {
  let attestation = Attestation.load(event.transaction.hash.toHex())
  if (!attestation) {
    attestation = new Attestation(event.transaction.hash.toHex())
    attestation.count = BigInt.fromI32(0);
  }
  attestation.blockNumber = event.block.number;
  attestation.timestamp = event.block.timestamp;
  attestation.attestor = event.params.attestor;
  attestation.profile = event.params.profile;
  attestation.value = BigInt.fromI32(event.params.attestation);
  attestation.count = attestation.count + BigInt.fromI32(1);
  attestation.save()

  let reputationWrapper = ReputationWrapper.load(event.params.profile.toHex());
  if (!reputationWrapper) {
    reputationWrapper = new ReputationWrapper(event.params.profile.toHex());
    reputationWrapper.count = BigInt.fromI32(0);
    reputationWrapper.currentReputation = BigInt.fromI32(0);
  }
  let cumulativeReputation = new CumulativeReputation(event.transaction.hash.toHex());
  cumulativeReputation.timestamp = event.block.timestamp;
  cumulativeReputation.value = reputationWrapper.currentReputation + BigInt.fromI32(event.params.attestation);
  cumulativeReputation.profile = event.params.profile;
  reputationWrapper.currentReputation = cumulativeReputation.value;
  cumulativeReputation.save();
  reputationWrapper.count = reputationWrapper.count + BigInt.fromI32(1);
  reputationWrapper.save();

}

export function handleContentPosted(event: contentPosted): void {
  let post = Post.load(event.params.postId.toHex()) 
  if (!post) {
    post = new Post(event.params.postId.toHex());
    post.count = BigInt.fromI32(0);
  }  
  post.blockNumber = event.block.number;
  post.timestamp = event.block.timestamp;
  post.profile = event.transaction.from;
  post.contentURI = event.params.contentURI;
  post.count = post.count + BigInt.fromI32(1);
  post.save()
}

export function handleCommentPosted(event: commentPosted): void {
  let comment = Comment.load(event.transaction.hash.toHex()) 
  if (!comment) {
    comment = new Comment(event.transaction.hash.toHex())
    comment.count = BigInt.fromI32(0);
  }  
  comment.blockNumber = event.block.number;
  comment.timestamp = event.block.timestamp;
  comment.profile = event.transaction.from;
  comment.postID = event.params.postId.toHex();
  comment.contentURI = event.params.commentURI;
  comment.count = comment.count + BigInt.fromI32(1);
  comment.save()
}
