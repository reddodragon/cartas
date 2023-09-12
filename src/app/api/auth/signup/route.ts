import { NextResponse } from "next/server";
import User from "@/models/user"
import {connectDB} from '@/libs/mongodb'
import bcrypt from 'bcryptjs'

//recibir datos
export async function POST(request: Request){
    const {fullname, email, password} = await request.json()
    console.log(email, fullname, password)
    
    //validacion
    if(!password || password.length < 6) return NextResponse.json({
        message: "la contraseña debe tener mas de 6 caracteres"
    },{
        status:400
    });


    try {
        
        await connectDB()
        const userFound = await User.findOne({email})
        //SI EXISTE ERROR
        if(userFound) return NextResponse.json({
            message: "email alredy exist"
        },{
            status:400
        })
        //si no existe hash password y crear usuario
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const user = new User({
            email,
            fullname,
            password: hashedPassword
        })
    
        const savedUser = await user.save()
        console.log(savedUser)
    
        return NextResponse.json({
            _id: savedUser._id,
            email: savedUser.email,
            fullname: savedUser.fullname
        })

    } catch (error) {
        console.log(error)

        if(error instanceof Error){
            return NextResponse.json({
                message: error.message
            },{
                status: 400
            })
        }
    }
}