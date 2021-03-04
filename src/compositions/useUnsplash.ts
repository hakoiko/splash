import { createApi } from 'unsplash-js'
import { Ref, ref, watch } from 'vue'

type UnsplashPhotoTag = {
  source: { [key: string]: unknown }
  title: string
  type: string
}

type UnsplashPhotoUrl = {
  full: string
  raw: string
  regular: string
  small: string
  thumb: string
}

type UnsplashUser = {
  [key: string]: unknown
}

type UnsplashPhoto = {
  alt_description?: string
  blur_hash?: string
  categories?: unknown[]
  color?: string
  created_at?: string
  current_user_collections?: unknown[]
  description?: string
  height?: number
  id?: string
  liked_by_user?: boolean
  likes?: number
  links?: { [key: string]: unknown }
  promoted_at?: unknown
  sponsorship?: unknown
  tags?: UnsplashPhotoTag[]
  updated_at?: string
  urls?: UnsplashPhotoUrl
  user?: UnsplashUser
  width?: number
}

export function useUnsplash (keyword: Ref<string>): Ref<UnsplashPhoto[]> {
  const photos = ref<UnsplashPhoto[]>([])
  const accessKey: string = import.meta.env.VITE_UNSPLASH_KEY as string || ''
  const unsplashApi = createApi({ accessKey: accessKey })

  async function searchPhotos (word: string): Promise<UnsplashPhoto[]> {
    try {
      const apiCall = await unsplashApi.search.getPhotos({ query: word, page: 1 })
      if (apiCall.response) photos.value = apiCall.response.results as unknown as UnsplashPhoto[] || []
    } catch (error) {
      throw new Error(error.message)
    }
    console.log(photos.value)
    return photos.value
  }

  watch(keyword, async (newval) => {
    await searchPhotos(newval)
  })

  return photos
}
