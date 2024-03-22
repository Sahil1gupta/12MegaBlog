import React from 'react'
import appwriteService from "../appwrite/configuration"
import {Link} from 'react-router-dom'
// all  these data we are directly getting from the appwrite database bcoz we haven't stored in store[slice]
function PostCard({$id, title, featuredImage}) {
    console.log(title)
    console.log(featuredImage)
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard