import { api } from './axios'

export const deleteUploadedImage = async (publicId: string) => {
    const result = await api.delete('/api/chat/deleteImage', {
        data: {
            publicId,
        },
    })

    return result.data
}