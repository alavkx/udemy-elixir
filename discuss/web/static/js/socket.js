import { Socket } from "phoenix"

let socket = new Socket("/socket", { params: { token: window.userToken } })
socket.connect()

function createSocket(topicId) {
  let channel = socket.channel(`comments:${topicId}`, {})
  channel.join()
    .receive("ok", resp => renderComments(resp.comments))
    .receive("error", resp => { console.log("Unable to join", resp) })

  channel.on(`comments:${topicId}:new`, renderComment)

  document.querySelector('button').addEventListener('click', function () {
    const content = document.querySelector('textarea').value
    channel.push('comment:add', { content })
  })
}

function commentTemplate(comment) {
  const emailEle = document.createElement('div')
  emailEle.className = "secondary-content"
  emailEle.innerText = comment.user ? comment.user.email : 'Anon'
  const contentEle = document.createElement('li')
  contentEle.className = "collection-item"
  contentEle.innerText = comment.content
  contentEle.appendChild(emailEle)
  return contentEle;
}

function renderComment(event) {
  const commentElement = commentTemplate(event.comment);
  const commentContainerElement = document.querySelector('.collection')
  commentContainerElement.appendChild(commentElement)
}

function renderComments(comments) {
  const commentElements = comments.map(commentTemplate)
  const commentContainerElement = document.querySelector('.collection')
  commentContainerElement.innerHTML = '';
  commentElements.forEach(x => commentContainerElement.appendChild(x))
}

window.createSocket = createSocket
