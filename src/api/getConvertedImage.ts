import { api } from './axios'

export const getConvertedImage = async (image: File) => {
    const formData = new FormData()
    formData.append('image', image)

    const result = await api.post('/api/chat/convertToUrl', formData)

    return result.data
}