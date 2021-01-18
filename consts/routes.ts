const home = '/'
const miscArticle = '/articles/:id'
const life = '/life'
const code = '/code'
const guides = '/guides'
const guidesArticle = '/guides/:id'
const projects = '/projects'
const contact = '/contact'
const login = '/login'
const secret = {
  home: '/secret',
  editor: '/secret/editor',
  editorMaterial: '/secret/editor/:id',
  pageEditor: '/secret/pageEditor',
  pageEditorExistingMaterial: '/secret/pageEditor/:id',
  guideEditor: '/secret/guideEditor',
  guideEditorExistingMaterial: '/secret/guideEditor/:id',
  fileUpload: '/secret/file-upload',
}

export default {
  home,
  miscArticle,
  life,
  code,
  guides,
  guidesArticle,
  projects,
  contact,
  login,
  secret,
}
