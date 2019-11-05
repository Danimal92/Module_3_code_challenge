let imageId = 3854 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  fetchImage();



})

function fetchImage(){
  fetch(imageURL)
  .then(res => res.json())
  .then(json => {
    console.log('json', json)
    displayImage(json)
  })
}

function fetchComments(){
  fetch(commentsURL)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      return json})
}

// function commentCreation(comment){

// }


function displayImage(infoArray){
  let imageSource = document.getElementById('image')
  let imageName = document.getElementById('name')
  let imageLikes = document.getElementById('likes')
  let imageComments = document.getElementById('comments')
  let imageID = infoArray.id 
  let likeButton = document.getElementById('like_button')


  imageSource.src = infoArray.url 
  imageName.textContent = infoArray.name 
  imageLikes.textContent = infoArray.like_count

  for(const comment of infoArray.comments){
    // let deleteButton = document.createElement('button')
    // deleteButton.textContent = 'Delete'
    let newComment = document.createElement('li')
    // newComment.appendChild(deleteButton)
    newComment.textContent = comment.content
    imageComments.append(newComment)
    console.log('comment', comment)
    console.log('new comment', newComment)
    

    // deleteButton.addEventListener('click', () => {
    //   newComment.remove()
    //   fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
    //     method: 'DELETE',
    //               headers: {
    //                   'Content-Type': 'application/json',
    //                   Accept: 'application/json'
    //                 },
    //               body: JSON.stringify({
    //                   image_id: imageId,
    //                   like_count: imageLikes.textContent
    //               })
  
    //   })
      


    // })
  }

  likeButton.addEventListener('click', () => {
    imageLikes.textContent++
    
    fetch(likeURL, {
      method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                  },
                body: JSON.stringify({
                    image_id: imageId,
                    like_count: imageLikes.textContent
                })

    })


  })
  let commentList = document.getElementById('comments')
  let form = document.getElementById('comment_form')
  form.addEventListener('submit',(ev) => {
    ev.preventDefault();
    

    let newComment = document.createElement('li');
    let commentInput = document.getElementById('comment_input')
    let commentValue = commentInput.value
    console.log(commentInput.value) 
    newComment.textContent = commentValue
    commentList.append(newComment)
    commentInput.value = ''

    fetch(commentsURL, {
      method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                  },
                body: JSON.stringify({
                    image_id: imageId,
                    content: commentValue
                })

    })
    

  })


  

}