let assert = require('assert');
let HComment = require('../../app/api/HComment').default;


// Faking the XMLHttpRequest
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let comment = new HComment();
comment.init('commentBox1');

describe('HComment', function() {
  describe('#filterContent()', function() {
    it('should return correct content when searching using it', function() {
      let searchKey = '';
      let arr = [
        {
          "username": "pturner0",
          "avatar_url": "https://secure.gravatar.com/avatar/cd4318b7fb1cf64648f59198aca8757f?d=mm",
          "name": "Paula Turner"
        },
        {
          "username": "pdixon1",
          "avatar_url": "https://secure.gravatar.com/avatar/be09ed96613495dccda4eeffc4dd2daf?d=mm",
          "name": "Patrick Dixon"
        },
        {
          "username": "mhansen2",
          "avatar_url": "https://secure.gravatar.com/avatar/15442f219c2c472e0f1572aacc1cdfd7?d=mm",
          "name": "Michael Hansen"
        }
      ];
      assert.equal();
    });
  });
});
