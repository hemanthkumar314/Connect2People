import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import SearchResults from '@/components/shared/SearchResults'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import { useEffect, useState } from 'react'
import { useInView } from "react-intersection-observer";
// import React from 'react'

const Explore = () => {
  const {ref,inView} = useInView();
  const { data:posts, fetchNextPage, hasNextPage} = useGetPosts();
  const [SearchValue, setSearchValue] = useState('');
  const deBouncedvalue = useDebounce(SearchValue,500);

  const { data:searchedPosts, isFetching:isSearchFetching } = useSearchPosts(deBouncedvalue);

  useEffect(()=>{
    if(inView && !SearchValue) fetchNextPage();
  },[inView,SearchValue,fetchNextPage])

  if(!posts)
  {
    return (
      <div className='w-full h-full flex-center'>
        <Loader/>
      </div>
    )
  }
  const Showsearchresults = SearchValue !=='';
  const ShowPosts = !SearchValue && 
                    posts.pages.every((item)=>item.documents.length===0)
  
  return (
    <div className='explore-container'>
      
      <div className='explor-inner_container'>
        <h2 className='w-full h3-bold md:h2-bold'>Search Posts</h2>
        <div className='flex w-full gap-4 px-4 rounded-lg bg-dark-4'>
          <img
            src='/assets/icons/search.svg'
            alt='search'
            width={24}
            height={24}
          />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={SearchValue}
            onChange={(e)=> setSearchValue(e.target.value)}
          />
        </div>
      </div>
      
      <div className='w-full max-w-5xl mt-16 flex-between mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>
        <div className='gap-3 px-4 py-2 cursor-pointer flex-center bg-dark-3 rounded-xl'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img
            src='/assets/icons/filter.svg'
            alt='filter'
            width={24}
            height={24}
          />
        </div>
        
      </div>

      <div className='flex flex-wrap w-full max-w-5xl gap-4'>
        { Showsearchresults ? 
          (
            <SearchResults
              isSearchFetching = {isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ): ShowPosts ?
          (
            <p className='w-full mt-10 text-center text-light-4'>
              End of Posts
            </p>
          ) : posts.pages.map((item,index)=>(
            <GridPostList key={`page-${index}`} posts={item.documents}/>
          ))
        }
      </div>

      {hasNextPage && !SearchValue && (
        <div ref={ref} className='mt-10'>
          <Loader/>
        </div>
      )}
      
    </div>
  )
}

export default Explore
