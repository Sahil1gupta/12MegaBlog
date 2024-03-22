import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../../components/index'
import AppwriteService from '../../appwrite/configuration'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({post}) {  //agar user edit pe click krega to post yaha pass ho jayega
    console.log(post)
    const {register,handleSubmit,watch,setValue,getValues,control,errors} = useForm({
            defaultValues:{
            title:post?.title || '', //agar user edit kar raha hai toh default value set karna padega jo ki apne ko backend se mil jayega jo ki ye post me h, varna ek naya post create krne aaya hai to title ki default value empty rahega to chalega
            slug:post?.slug ||'',
            content:post?.content || '',
            status:post?.status || 'active'
        },
    } )

    const navigate=useNavigate();
    const userData=useSelector(state=>state.auth.userData);

    const submit=async (data)=>{
        console.log(data)
       if(post){  //ye tb execute hoga jb user edit pe click krega
        const file = data.image[0] ? await AppwriteService.uploadFile(data.image[0]) : null;  //getting image id by using uploading file feature
        console.log(file)
        if(file){
            AppwriteService.deleteFile(post.featuredImage)  // deleting previous image featuredImage= it is equivalent to image id.
        }
        const dbPost=await AppwriteService.updatePost(post.$id,{
            ...data,
            featuredImage:file?file.$id:undefined,
        });

        if(dbPost){
            navigate(`/post/${dbPost.$id}`)
        }
       }
       else {
        const file = await AppwriteService.uploadFile(data.image[0]);
        console.log(file)
        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await AppwriteService.createPost({ ...data, userId: userData.$id });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }
    }

    const slugTransform=useCallback((value)=>{
            if(value && typeof value==="string"){
                return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
            }
            return "";
    },[])

    React.useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==="title"){
                setValue("slug",slugTransform(value.title),
                {shouldValidate:true})
            }
        })
    },[watch,slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={AppwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm