import React ,{useState,useCallback,useEffect}from 'react'
import AppwriteService from '../appwrite/configuration'
import PostCard from '../components/PostCard'
 
function AllPosts() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{},[])
    AppwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <div className="flex flex-wrap">
        {posts.map((post)=>(
            <div className="p-2 w-1" key={post.$id}>
                <PostCard key={post.$id} post={post}/>
            </div>
            
        ))}

        </div>
        

    </div>
  )
}

export default AllPosts