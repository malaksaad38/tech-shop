"use client"

import React, {useEffect, useState} from "react"
import Cookies from "js-cookie"
import CryptoJS from "crypto-js"
import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

// Schema for password validation
const formSchema = z.object({
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})

type AdminControlProps = {
  children: React.ReactNode
}

// Static password (for testing only!)
const ADMIN_PASSWORD = "supersecret"

// Precomputed hash of the static password
const ADMIN_HASH = CryptoJS.SHA256(ADMIN_PASSWORD).toString()

const COOKIE_KEY = "admin_auth"

const AdminControl: React.FC<AdminControlProps> = ({children}) => {
  const [isAuthed, setIsAuthed] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {password: ""},
  })

  useEffect(() => {
    const savedHash = Cookies.get(COOKIE_KEY)
    if (savedHash && savedHash === ADMIN_HASH) {
      setIsAuthed(true)
    }
  }, [])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const enteredHash = CryptoJS.SHA256(values.password).toString()
    if (enteredHash === ADMIN_HASH) {
      Cookies.set(COOKIE_KEY, enteredHash, {expires: 1}) // save for 1 day
      setIsAuthed(true)
    } else {
      form.setError("password", {message: "Invalid password"})
    }
  }

  if (!isAuthed) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-96 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter admin password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If authenticated → render protected content
  return <>{children}</>
}

export default AdminControl
