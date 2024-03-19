import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config/config"

// https://appwrite.io/docs/references/cloud/client-web/databases#getDocument   --refer this documentation


export class Service{

    client=new Client();
    databases
    storage //bucket

    Constructor(){
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

      this.databases=new Databases(this.client);
      this.bucket=new Storage(this.client);
    }

    async createPost({title,content,featuredImage,status,userId,slug}){

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
                config.appwriteDatabaseId,
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
                config.appwriteDatabaseId,
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
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}


const AppwriteService = new Service()
export default AppwriteService
