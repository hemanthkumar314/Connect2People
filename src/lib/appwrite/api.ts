import { INewPost, INewUser, IUpdatePost } from "@/types";
import {ID,Query} from 'appwrite';
import {account, appwriteConfig, avatars, databases, storage} from './config'
export async function createUserAccount(user: INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if(!newAccount) throw Error;

        const avatarUrl=avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId:newAccount.$id,
            email:newAccount.email,
            name:newAccount.name,
            username:user.username,
            imageUrl:avatarUrl,
        }) 

        return newUser;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

export async function saveUserToDB(user:{
    accountId:string;
    email:string;
    name:string;
    imageUrl:URL;
    username?:string;
}) {
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser
    }
    catch(err){
        console.log(err);
    }
}

export async function signInAccount(user:{email:string,password:string}){
    try{
        const session = await account.createEmailPasswordSession(user.email,user.password)
        return session
    }catch(err){
        console.log(err)
    }
}

export async function signOutAccount(){
    try{
        const session = await account.deleteSession("current")
        return session
    }catch(err){
        console.log(err)
    }
}

export async function getCurrentUser() {
    try{

        const session = await account.getSession('current');
        if (!session) {
            console.log("User not authenticated.");
            return null;
        }
        
        const currentAccount = await account.get();

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0];
    }catch(err){
        console.log(err);
    }
    
}

export async function createPost(post:INewPost) {
    try{
        //upload image to storage
        const uploadedFile = await uploadFile(post.file[0]);

        if(!uploadedFile) throw Error;

        //get file preview as URL
        const fileUrl = getFilePreview(uploadedFile.$id);

        if(!fileUrl)
        {
            deleteFile(uploadedFile.$id);
            throw Error;
        }

        //convert tags in an array
        const tags= post.tags?.replace(/ /g,'').split(',') || [];

        //save post to db
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if(!newPost){
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newPost;

    }catch(error){
        console.log(error);
    }
}

export async function uploadFile(file:File) {
    try{
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file   
        );
        return uploadedFile;
    }catch(Error){
        console.log(Error);
    }
}

export function getFilePreview(fileId:string) {
    try{
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            undefined,
            100
        )
        return fileUrl
    }catch(Error){
        console.log(Error);
    }
}

export async function deleteFile(fileId:string) {
    try{
        await storage.deleteFile(appwriteConfig.storageId,fileId);
        return { status:'ok' }
    }catch(Error){
        console.log(Error);
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'),Query.limit(20)]
    )
    
    if(!posts) throw Error

    return posts;
}

export async function likePost(postId:string,likesArray:string[]) {
    try{
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        )
        if(!updatedPost) throw Error

        return updatedPost;
    }catch(Error){
        console.log(Error)
    }
}

export async function savePost(postId:string,userId:string) {
    try{
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user:userId,
                post:postId,
            }
        )
        if(!updatedPost) throw Error

        return updatedPost;
    }catch(Error){
        console.log(Error)
    }
}

export async function deleteSavedPost(savedRecordId:string) {
    try{
        const Statuscode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
        )
        if(!Statuscode) throw Error

        return {status:'ok'};
    }catch(Error){
        console.log(Error)
    }
}

export async function getPostbyId(postId:string)
{
    try{
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        if(!post) throw Error
        return post;

    }catch(Error)
    {
        console.log(Error)
    }
}

export async function UpdatePost(post:IUpdatePost) {
    const hasFiletoUpdate  =  post.file.length>0;
    try{
        let image ={
            imageUrl : post.imageUrl,
            imageId : post.imageId,
        }

        if(hasFiletoUpdate){
            const uploadedFile = await uploadFile(post.file[0]);

            if(!uploadedFile) throw Error;

            const fileUrl = getFilePreview(uploadedFile.$id);

            if(!fileUrl)
            {
                deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = {...image, imageUrl:fileUrl , imageId:uploadedFile.$id}

        }
        
        //convert tags in an array
        const tags= post.tags?.replace(/ /g,'').split(',') || [];

        //save post to db
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags
            }
        )

        if(!updatedPost){
            await deleteFile(post.imageId);
            throw Error;
        }

        return updatedPost;

    }catch(error){
        console.log(error);
    }
}

export async function deletePost(postId:string , imageId:string) {
    if(!postId || imageId) throw Error

    try{
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )
    }catch(Error)
    {
        console.log(Error)
    }
}