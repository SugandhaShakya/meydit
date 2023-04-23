import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'

export default class JobController {
    public async index({ response }: HttpContextContract) {
        const jobs = await Job.query().preload('customer')
        response.ok(jobs)
    }
    
    public async store({ request, response }: HttpContextContract) {
        const jobData = request.only(['userId', 'type_of_clothing', 'description', 'budget'])
        const job = await Job.create(jobData)
        response.created(job)
    }
    
    public async show({ params, response }: HttpContextContract) {
        const job = await Job.findOrFail(params.id)
        await job.load('customer')
        response.ok(job)
    }
    
    public async update({ params, request, response }: HttpContextContract) {
        const jobData = request.only(['userId', 'type_of_clothing', 'description', 'budget', 'status'])
        const job = await Job.findOrFail(params.id)
        job.merge(jobData)
        await job.save()
        response.ok(job)
    }
    
    public async destroy({ params, response }: HttpContextContract) {
        const job = await Job.findOrFail(params.id)
        await job.delete()
        response.noContent()
    }
}
