import GridPostList from '@/components/shared/GridPostList'
import SearchResults from '@/components/shared/SearchResults'
import { Input } from '@/components/ui/input'
import { useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import { useState } from 'react'
// import React from 'react'

const Explore = () => {
  const [SearchValue, setSearchValue] = useState('')

  const { data:searchedPosts, isFetching:isSearchFetching } = useSearchPosts(SearchValue)

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
            <SearchResults/>
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
      
    </div>
  )
}

export default Explore
