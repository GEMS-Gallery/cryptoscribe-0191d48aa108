import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Text "mo:base/Text";

actor {
  type Post = {
    id: Nat;
    title: Text;
    content: Text;
    author: Text;
    timestamp: Time.Time;
  };

  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  public func createPost(title: Text, content: Text, author: Text) : async Result.Result<Nat, Text> {
    let post : Post = {
      id = nextId;
      title = title;
      content = content;
      author = author;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [post]);
    nextId += 1;
    #ok(post.id)
  };

  public query func getPosts() : async [Post] {
    Array.sort(posts, func(a: Post, b: Post) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    })
  };
}
