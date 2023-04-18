import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'


export default class AuthController {
    public async register({request, response, auth}:HttpContextContract){
        const userSchema = schema.create({
            first_name: schema.string(),
            last_name: schema.string(),
            phone: schema.string(),
            address: schema.string(),
            postcode: schema.string(),
            state: schema.string(),
            email:schema.string({},[
                rules.email(), 
                rules.unique({table: 'users', column: 'email'}),
            ]),
            password: schema.string([rules.minLength(8)]),

        })
        const data = await request.validate({schema: userSchema})
        const user = await User.create(data)
        await auth.login(user)
        return response.status(201).send(user)

        // return response.redirect().toPath('/')
    }

    public async login({request, response, session, auth}:HttpContextContract){
        const{email, password} = request.only(['email','password'])

        try{
            await auth.attempt(email,password)
            const user = auth.user
            return response.status(201).send(user)
        }catch(_error){
            session.flash('errors','Email or password is incorrect')
            return response.redirect().back()
        }
        
        // return response.redirect().toPath('/')
        
    }

    public async logout({response, auth}:HttpContextContract){
        await auth.logout()
        return response.redirect().toPath('/')
    }
}

