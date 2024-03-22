import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config";

// https://appwrite.io/docs/references/cloud/client-web/databases#getDocument   --refer this documentation


export class Service{

    client=new Client();
    databases
    storage //bucket

    constructor(){
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

      this.databases=new Databases(this.client);
      this.bucket=new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){

        try {
            return  await this.databases.createDocument(config.appwriteDatabseId, config.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabseId, config.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
            })
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }

    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(config.appwriteDatabseId, config.appwriteCollectionId, slug);
             return true;
        }
       
        catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false;
        }
    }

    
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabseId,
                config.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabseId,
                config.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service
//https://appwrite.io/docs/products/storage/upload-download
    async uploadFile(file){
        console.log(file)
        try {
           
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        console.log(fileId)
       try{
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
       }
       catch(error){
        console.log("Appwrite serive :: getFilePreview :: error", error)
       }
    }
}


const AppwriteService = new Service()
export default AppwriteService
