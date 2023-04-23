import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JobImage from 'App/Models/JobImage'
import Application from '@ioc:Adonis/Core/Application'

export default class JobImagesController {
    public async handle({ request, response, params }:HttpContextContract) {
        const jobImage = new JobImage()
    
        // Get the uploaded image file from the request
        const image = request.file('image', {
          extnames: ['jpg', 'jpeg', 'png'],
          size: '2mb'
        })
        
        if (!image || !image.isValid) {
            return response.status(400).json({ error: 'Invalid file' })
        }

        await image.move(Application.publicPath('uploads'))

        if (image.state !== 'moved') {
            return response.status(400).json({ error: image.errors })
          }

        jobImage.job_id = params.id
        jobImage.image_url = `uploads/${image.fileName}`
      
          // Save the new JobImage to the database
        await jobImage.save()
      
        return response.status(201).json(jobImage)
    
       
      }
}
