import HComment from './api/HComment';

document.addEventListener('DOMContentLoaded', function _loaded() {
  document.removeEventListener('DOMContentLoaded', _loaded);
  let comment = new HComment();
  comment.init('commentBox1');
});
