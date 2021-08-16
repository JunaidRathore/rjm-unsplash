import React from 'react'

const Photo = ({urls,alt_description,user,likes}) => {
  const {regular} = urls
  const {name,profile_image,portfolio_url} = user
  // console.log(sponsorship)
  return <article className="photo">
    <img src={regular} alt={alt_description} /> 
    <div className="photo-info">
      <div>
        <h4>{name}</h4>
        <p>{likes} likes</p>
      </div>
      <a href={portfolio_url}>
        <img src={profile_image.medium} className="user-img" alt={name} />
      </a>
    </div>
  </article>
}

export default Photo
