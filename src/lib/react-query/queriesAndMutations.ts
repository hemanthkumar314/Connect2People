/* eslint-disable @typescript-eslint/no-unused-vars */
import { INewPost, INewUser, IUpdatePost } from '@/types'
import { useQuery,useMutation,useQueryClient,useInfiniteQuery } from '@tanstack/react-query'
import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getPostbyId, getRecentPosts, likePost, savePost, signInAccount, signOutAccount, UpdatePost } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys';

export const useCreateUserAccount =()=>{
    return useMutation({
        mutationFn:(user:INewUser)=>createUserAccount(user)
    })
}

export const useSignInAccount =()=>{
    return useMutation({
        mutationFn:(user:{email:string,password:string})=>signInAccount(user)
    })
}

export const useSignOutAccount =()=>{
    return useMutation({
        mutationFn:signOutAccount
    })
}

export const useCreatePost =()=>{
    const queryclient = useQueryClient();
    return useMutation({
        mutationFn:(post:INewPost)=>createPost(post),
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
            })
        }
    })
}


export const useGetRecentPosts =() => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn:getRecentPosts,
    })
}

export const useLikePost = ()=>{
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn:({postId,likesArray}:{postId:string,likesArray:string[]})=>
        likePost(postId,likesArray),
        onSuccess:(data)=>{
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID,data?.$id]
            })
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useSavePost = ()=>{
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn:({postId,userId}:{postId:string,userId:string})=>
        savePost(postId,userId),
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useDeletesavePost = ()=>{
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn:(savedRecordId:string)=>
        deleteSavedPost(savedRecordId),
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POSTS]
            })
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useGetCurrentUser = ()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_CURRENT_USER],
        queryFn:getCurrentUser,
    })
}

export const useGetPostbyId =(postId:string)=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID,postId],
        queryFn : () => getPostbyId(postId),
        enabled: !!postId
    })
}

export const useUpdatePost =()=>{
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn:(post:IUpdatePost)=>
        UpdatePost(post),
        onSuccess:(data)=>{
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_POST_BY_ID,data?.$id]
            })
        }
    })
}

export const useDeletePost =()=>{
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn:({postId,imageId}:{postId:string,imageId:string})=>
        deletePost(postId,imageId),
        onSuccess:()=>{
            queryclient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}