import { BigInt } from "@graphprotocol/graph-ts"
import {
  Verum,
  attestationPosted,
  contentPosted,
  commentPosted
} from "../generated/Verum/Verum"
import { Attestation, Post, Comment } from "../generated/schema"

export function handleAttestationPosted(event: attestationPosted): void {
  let attestation = Attestation.load(event.transaction.from.toHex())
  if (!attestation) {
    attestation = new Attestation(event.transaction.from.toHex())
  }
  attestation.blockNumber = event.block.number;
  attestation.attestor = event.params.attestor;
  attestation.profile = event.params.profile
  attestation.save()
}

export function handleContentPosted(event: contentPosted): void {
  let post = Post.load(event.params.postId.toHex()) 
  if (!post) {
    post = new Post(event.params.postId.toHex())
  }  
  post.blockNumber = event.block.number;
  post.contentURI = event.params.contentURI;
  post.save()
}

export function handleCommentPosted(event: commentPosted): void {
  let comment = Comment.load(event.params.postId.toHex()) 
  if (!comment) {
    comment = new Comment(event.params.postId.toHex())
  }  
  comment.blockNumber = event.block.number;
  comment.postID = event.params.postId.toHex();
  comment.contentURI = event.params.commentURI;
  comment.save()
}
